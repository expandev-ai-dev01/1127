# TODO List Backend API

Backend REST API for TODO List system built with Node.js, Express, TypeScript, and SQL Server.

## Features

- RESTful API architecture
- TypeScript for type safety
- Express.js framework
- SQL Server database integration
- Multi-tenancy support
- Comprehensive error handling
- API versioning
- CORS configuration
- Security middleware (Helmet)
- Request compression

## Prerequisites

- Node.js 18+ 
- SQL Server 2019+
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials

## Development

Start development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

## Production

Start production server:
```bash
npm start
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## API Documentation

### Base URL
- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check
```
GET /health
```

Returns server health status.

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Test utilities
├── config/                 # Configuration
└── server.ts               # Application entry point
```

## Environment Variables

See `.env.example` for all available configuration options.

## License

ISC