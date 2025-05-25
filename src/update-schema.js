#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Updating GraphQL schema from Django backend...');

// Ensure the schema directory exists
const schemaDir = path.join(__dirname, 'schema');
if (!fs.existsSync(schemaDir)) {
  fs.mkdirSync(schemaDir, { recursive: true });
}

const schemaPath = path.join(schemaDir, 'schema.graphql');

// Execute Django management command to dump schema (this would need to be implemented in Django)
exec('cd ../../ && python manage.py graphql_schema --out clients/sdk-ts/src/schema/schema.graphql', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message}`);
    return;
  }
  
  if (stderr) {
    console.error(`Command stderr: ${stderr}`);
  }
  
  console.log(`Schema successfully extracted to ${schemaPath}`);
  console.log('You can now run "npm run generate" to update the TypeScript types');
}); 