const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Sanitation-Trash-Pickup',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

