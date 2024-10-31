# Trash Pickup QR Code System

This project allows trash collectors to scan QR codes on trash cans to check if residents have paid for the month and whether their trash has been picked up for the week.

## License
All rights reserved. This software may not be used, copied, modified, or distributed without explicit permission from the owner of this repository, Kareena NS.

## Features
- Generate unique QR codes for each resident's trash can.
- Scan QR code to display red (unpaid) or green (paid).
- Update trash pickup status weekly.

## Sprint 1 Features
- Completed this sprint: Added all the residents from the original CSV file into the database, implemented UI for editing a resident, and coded UI for the resident to be searchable by address on the home page, and editable there too
- Known bugs: residents are unable to be added to the database, UI for this page needs to be fixed as well, residents payment and trash collected field are not editable currently
- Next features to implement: a login for the user in sanitation to update residents, debugging
- Future sprints: generate a QR code based on the resident's ID, linking the QR code to the resident ID, automating having the user scan a QR code and it automatically marks the trash as picked up for that resident (changeable based on the week), automating payments

## Sprint 2 Features
- Completed this sprint: Implemented login and logout feature, the navbar is unable to be accessed (like home and add resident) without logging in, the adding a resident bug has been fixed, a resident is able to be deleted, all fields except entering or changing an address have been changed from text fields to dropdown menus
- Known bugs: N/A
- Next features to implement: Create a page with a list of all residents, start researching how i can link the qr code to the six digit resident id i made
    - The Qr code should be able to do two things: 1. it should display to the person scanning it that the resident has paid or not and 2. it should update the database to change the trashCollection field to true
- Future sprints: TBA

## Sprint 3 Features
- Completed this sprint: Changed the UI to have a list of residents with filters and a search bar as the home page,
- Known bugs: the QR code scanning is still not directing the user to their own resident page
- Next features to implement: fixing the QR code reading and updating the trashCollected field, implement verification for signup (have to have a city email)
- Future sprints: Returns to user a list of all residents whose trash has not been picked up by the end of the week and they have paid

## Sprint 4 Features
- Completed this sprint: added resident id field to be searched for on the home page; QR code is directing to the right place now. 
- Known bugs: There is no way to track whether or not the trash has been collected if the resident has not paid because that requires the trash collector to note whether they picked it up or not: right now, the QR code is scanned and it automatically updates as collected
- Next features to implement: 
