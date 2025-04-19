# kavos-gr-functions

Serverless functions for Kavos.gr application.

## Functions

- **NotificationProcessor** - Handles sending notifications to customers for cruise inquiries via email and WhatsApp
- **InteractionLogger** - Records all customer communications for cruise inquiries across different channels

## Development

This project contains Azure Functions that power the customer communication system for the Kavos.gr cruise booking platform. These functions handle notification delivery and maintain a comprehensive record of all customer interactions.

### Requirements

- Node.js v20+
- Azure Functions Core Tools
- Azure CLI (for deployment)

### Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Configure local settings in `local.settings.json`
4. Start the functions locally: `npm start`

### Configuration

The functions require several environment variables to be configured:
