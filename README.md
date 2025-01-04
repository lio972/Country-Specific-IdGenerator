# Country Tools Application

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [User Interface](#user-interface)
4. [Generation Functionality](#generation-functionality)
5. [Architecture](#architecture)
6. [Installation](#installation)
7. [Usage](#usage)
8. [API Documentation](#api-documentation)
9. [Development](#development)
10. [Release Notes](#release-notes)

## Overview
The Country Tools application provides two main functionalities:
1. **Validation**: Validate city names and phone numbers against selected countries
2. **Generation**: Generate complete, valid identities based on selected countries

## Features
- Modern, responsive user interface
- Country selection dropdown with automatic population
- City and phone number validation
- Complete identity generation including:
  - Personal information (name, gender)
  - Address details
  - Identification numbers
  - Financial information (credit cards)
- Detailed error handling and user feedback
- RESTful API for future extensions

## User Interface

### Color Scheme
- Primary Color: #2563eb (Blue)
- Secondary Color: #1e40af (Dark Blue)
- Background: #f8fafc (Light Gray)
- Text: #1e293b (Dark Gray)
- Success: #16a34a (Green)
- Error: #dc2626 (Red)

### Layout
1. **Header**
   - Application title
   - Menu buttons for switching between validation and generation

2. **Validation Section**
   - Country selection dropdown
   - City input field
   - Phone number input field
   - Validate button
   - Validation results display

3. **Generation Section**
   - Country selection dropdown
   - Generate button
   - Form-like display of generated identity

4. **Output Area**
   - Shows results of validation or generation
   - Includes loading states and error messages
   - Formatted display of generated identities

## Generation Functionality

### Generated Data Structure
The generation feature creates complete, valid identities including:

1. **Personal Information**
   - First and last name
   - Gender
   - Phone number (country-specific format)

2. **Address**
   - Street address
   - City
   - ZIP code
   - Country

3. **Identification**
   - Social Security Number (valid format)

4. **Financial Information**
   - Credit card type (Visa or MasterCard)
   - Valid credit card number
   - Expiration date (1-3 years in future)
   - CVV code

### Data Validation
All generated data is:
- Country-specific
- Properly formatted
- Valid according to standard patterns
- Coherent across all fields

## Architecture

### System Diagram
```
+-------------------+
|    Web Browser    |  <--- User Interface
+-------------------+
         |
         v
+-------------------+
|  Node.js Server   |  <--- Application Core
+-------------------+
         |
         v
+-------------------+
|  Data Storage     |  <--- countries_cities.json
+-------------------+
```

### Components
1. **Frontend**
   - HTML/CSS/JavaScript
   - Modern UI with proper color scheme
   - Responsive design
   - Client-side validation

2. **Backend**
   - Node.js HTTP server
   - Static file serving
   - JSON data endpoint
   - Data generation logic

3. **Data**
   - JSON file (countries_cities.json)
   - Contains country-specific data
   - Used for validation and generation

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Modern web browser

### Installation Steps
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the server:
```bash
node server.js
```

### Docker Installation
1. Build the Docker image:
```bash
docker build -t country-tools .
```
2. Run the container:
```bash
docker run -p 3000:3000 country-tools
```

## Usage
1. Access the application at http://localhost:3000
2. Use the menu to switch between validation and generation
3. For validation:
   - Select a country
   - Enter city and phone number
   - Click "Validate"
4. For generation:
   - Select a country
   - Click "Generate Identity"
   - View complete identity information in form format

## API Documentation
### Endpoints
- `GET /data/countries_cities.json`
  - Returns the complete country data
- `GET /api/generate/{countryCode}`
  - Generates a complete identity for the specified country

### Example Response
```json
{
  "personal": {
    "firstName": "John",
    "lastName": "Smith",
    "gender": "male",
    "phone": "+11234567890"
  },
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001",
    "country": "United States"
  },
  "identification": {
    "ssn": "123-45-6789"
  },
  "financial": {
    "creditCard": {
      "type": "Visa",
      "number": "4123456789012345",
      "expiration": "12/25",
      "cvv": "123"
    }
  }
}
```

## Development
### Running in Development Mode
1. Start the development server:
```bash
npm run dev
```
2. The application will automatically reload when changes are made

### Adding New Countries
1. Edit `data/countries_cities.json`
2. Add new country object with required fields:
```json
{
  "code": "XX",
  "name": "Country Name",
  "phone_code": "+XX",
  "phone_pattern": "^\\+XX\\d{X}$",
  "time_zone": "Continent/City",
  "currency": "XXX",
  "cities": ["City1", "City2"]
}
```

## Release Notes

### Version 1.0.0
- Initial release
- Features:
  - Country validation
  - Basic identity generation
  - Basic UI
  - Docker support
  - Comprehensive documentation

### Version 1.1.0
- Added:
  - Modern, responsive UI design
  - Color scheme implementation
  - Loading states and animations
  - Improved error handling
  - Better user feedback mechanisms
  - Touch-friendly controls
- Fixed:
  - Dropdown population issues
  - API reliability
  - Data loading problems
  - Mobile layout issues

### Version 1.2.0
- UI Enhancements:
  - Added smooth transitions between sections
  - Improved button hover effects
  - Better visual hierarchy
  - Enhanced typography
  - Consistent spacing and padding
- Functional Improvements:
  - Added input validation
  - Improved error messages
  - Better loading indicators
  - Enhanced accessibility features

### Version 2.0.0
- Major Update: Enhanced Generation Functionality
  - Added complete identity generation including:
    - Personal information (name, gender)
    - Address details
    - Identification numbers
    - Financial information
  - New form-like display for generated identities
  - Improved data validation and formatting
  - Country-specific data generation
  - Realistic, valid data patterns
  - Organized display of information in sections
  - Better data coherence across fields

## License
This project is licensed under the MIT License - see the LICENSE file for details.
