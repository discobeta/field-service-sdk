# Field Service SDK

This is the TypeScript SDK for the Field Service application. It provides a type-safe way to interact with the Field Service API.

## Installation

To install the SDK in your project:

```bash
npm install field-service-sdk
```

## Usage

```typescript
import { FieldServiceSDK } from 'field-service-sdk';

// Initialize the SDK
const sdk = new FieldServiceSDK({
  apiUrl: 'YOUR_API_URL',
  // Optional: Add your authentication token
  token: 'YOUR_AUTH_TOKEN'
});

// Use the SDK methods
const jobs = await sdk.getJobs();
```

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Generating the SDK

The SDK is generated from GraphQL schema and operations. To generate a new version:

1. Update the schema (if needed):
   ```bash
   npm run update-schema
   ```

2. Generate TypeScript types and operations:
   ```bash
   npm run generate
   ```

3. Build the SDK:
   ```bash
   npm run build
   ```

Or run all steps at once:
```bash
npm run prepare
```

### Testing the SDK

To test the SDK locally in another project:

1. Build the SDK:
   ```bash
   npm run prepare
   ```

2. Link the SDK:
   ```bash
   npm link
   ```

3. In your project:
   ```bash
   npm link field-service-sdk
   ```

## Available Methods

The SDK provides the following main functionalities:

- Authentication
- Job Management
- User Management
- Location Services
- Media Handling

For detailed API documentation, please refer to the TypeScript types in the `dist` folder.

## Contributing

1. Make your changes
2. Update tests if necessary
3. Run the build process
4. Submit a pull request

## License

[Your License Here] 