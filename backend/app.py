from datetime import time
import random
import csv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from werkzeug.utils import secure_filename

app = Flask(__name__)

# CORS configuration
cors_config = {
    "origins": ["http://localhost:3000"],
    "methods": ["GET", "POST", "PUT", "DELETE"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}

# Initialize Firebase Admin SDK
cred = credentials.Certificate('C:/Users/Kareena/Documents/Sanitation-Trash-Pickup/backend/serviceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
CORS(app, resources={r"/*": cors_config})

@app.route('/')
def home():
    return "Welcome to the Sanitation Trash Pickup API!"

# Function to generate a unique six-digit ID
def generate_unique_id():
    while True:
        id = random.randint(100000, 999999)  # Generate a random six-digit number
        # Check if ID already exists in Firestore
        if not db.collection('residents').document(str(id)).get().exists:
            return id
        
@app.route('/create-resident', methods=['POST'])
def create_resident():
    # Check if there's a file in the request (CSV upload)
    if 'file' in request.files:
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if file and file.filename.endswith('.csv'):
            filename = secure_filename(file.filename)
            file.save(filename)
            try:
                # Process the CSV file
                with open(filename, 'r') as csvfile:
                    reader = csv.DictReader(csvfile)
                    for row in reader:
                        address = row.get('address')
                        pickup_day = row.get('pickupDay')
                        payment_status = row.get('paymentStatus')
                        trash_collection = row.get('trashCollection')
                        # Generate a unique resident ID
                        resident_id = generate_unique_id()  # Ensure unique ID generation here
                        # Create resident document in Firestore
                        resident_data = {
                            'id': resident_id,
                            'address': address,
                            'pickupDay': pickup_day or 'undecided',
                            'paymentStatus': payment_status.lower() == 'yes',  # Convert to boolean
                            'trashCollection': trash_collection.lower() == 'yes',  # Convert to boolean
                            'qrCodeData': f"https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/payment-status/{resident_id}&size=150x150"
                        }
                        db.collection('residents').document(str(resident_id)).set(resident_data)
            except Exception as e:
                return jsonify({'error': str(e)}), 500
            finally:
                os.remove(filename)  # Remove the file after processing

            return jsonify({'message': 'Residents created successfully!'}), 201
        else:
            return jsonify({'error': 'Invalid file type, please upload a CSV file.'}), 400
    # If no file, check for JSON data (for single resident creation via form)
    data = request.json
    if data:
        address = data.get('address')
        pickup_day = data.get('pickupDay')
        payment_status = data.get('paymentStatus')
        trash_collection = data.get('trashCollection')
        if not address or not payment_status or not trash_collection or not pickup_day:
            return jsonify({'error': 'All fields are required'}), 400
        # Generate a unique resident ID
        resident_id = generate_unique_id()  # Fix ID generation here
        # Create resident document in Firestore
        resident_data = {
            'id': resident_id,
            'address': address,
            'pickupDay': pickup_day,
            'paymentStatus': payment_status.lower() == 'yes',  # Convert to boolean
            'trashCollection': trash_collection.lower() == 'yes',  # Convert to boolean
            'qrCodeData': f"https://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/payment-status/{resident_id}&size=150x150"
        }
        db.collection('residents').document(str(resident_id)).set(resident_data)
        return jsonify({'id': resident_id, 'message': 'Resident created successfully!'}), 201
    return jsonify({'error': 'No data provided'}), 400

@app.route('/get-resident-status/<resident_id>', methods=['GET'])
def get_resident_status(resident_id):
    resident = db.collection('residents').document(resident_id).get()
    if not resident.exists:
        return jsonify({'error': 'Resident not found'}), 404
    resident_data = resident.to_dict()
    return jsonify({'paymentStatus': resident_data.get('paymentStatus'), 'message': 'Resident status fetched successfully'}), 200

@app.route('/update-trash-status/<resident_id>', methods=['POST'])
def update_trash_status(resident_id):
    try:
        db.collection('residents').document(resident_id).update({'trashCollection': True})
        return jsonify({'message': 'Trash collection status updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get-resident', methods=['GET'])
def get_resident():
    address = request.args.get('address')
    resident_ref = db.collection('residents').where('address', '==', address).limit(1).get()
    if resident_ref:
        resident_data = resident_ref[0].to_dict()
        resident_data['id'] = resident_ref[0].id  # Add the ID
        return jsonify(resident_data), 200
    
    return jsonify({'error': 'Resident not found.'}), 404

@app.route('/update-resident/<string:resident_id>', methods=['PUT'])
def update_resident(resident_id):
    resident_data = request.json
    db.collection('residents').document(resident_id).update(resident_data)
    return jsonify({'message': 'Resident updated successfully!'}), 200

@app.route('/delete-resident/<resident_id>', methods=['DELETE'])
def delete_resident(resident_id):
    try:
        # Find and delete the resident document in Firestore
        db.collection('residents').document(resident_id).delete()
        return jsonify({'message': 'Resident deleted successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
