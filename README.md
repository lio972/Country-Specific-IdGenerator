# Country and City Validation Application (WebContainer Version)

## Table of Contents
1. [Overview](#overview)
2. [Changes from Previous Version](#changes-from-previous-version)
3. [Project Files](#project-files)
4. [Architecture](#architecture)
5. [Features](#features)
6. [Interface Functionality](#interface-functionality)
7. [Installation and Running](#installation-and-running)
8. [Usage Examples](#usage-examples)
9. [Development](#development)
10. [Troubleshooting](#troubleshooting)

## Overview
This version of the Country and City Validation Application has been adapted to run in WebContainer, using only Python's standard library. It provides a web interface and basic API functionality.

## Changes from Previous Version

### Removed Features
- AI Agent functionality (due to WebContainer limitations)
- Flask dependency
- OpenAI integration

### Added Features
- Built-in HTTP server using Python's standard library
- Simplified validation logic
- WebContainer-compatible implementation

### Modified Features
- Simplified data structure
- Basic phone number validation
- City validation against static data

## Project Files

### File Structure
```
country-validator/
├── app.py                # Main application logic
├── data/
│   └── countries_cities.json  # Country and city data
├── static/
│   └── index.html        # Web interface
└── README.md             # Documentation
```

### File Descriptions

#### app.py
- **Role**: Main application file
- **Responsibilities**:
  - HTTP server implementation
  - API endpoint handlers
  - File serving
- **Key Components**:
  - BaseHTTPRequestHandler implementation
  - Request routing
  - Basic validation functions

#### data/countries_cities.json
- **Role**: Data storage
- **Structure**:
  - JSON format
  - Contains country-specific data
- **Fields**:
  - Country code
  - Name
  - Phone code
  - Phone pattern
  - Time zone
  - Currency
  - List of cities

#### static/index.html
- **Role**: Web interface
- **Components**:
  - HTML structure
  - CSS styling
  - JavaScript functionality
- **Features**:
  - Country selection
  - City and phone number input
  - Basic validation feedback

## Architecture

### System Diagram
```
+-------------------+
|    Web Browser    |  <--- User Interface
+-------------------+
         |
         v
+-------------------+
| Python HTTP Server|  <--- Application Core
+-------------------+
         |
         v
+-------------------+
|  Data Storage     |  <--- countries_cities.json
+-------------------+
```

### Components
1. **Web Interface**
   - Built with HTML/CSS/JavaScript
   - Communicates with HTTP server via API
   - Provides basic validation interface

2. **HTTP Server**
   - Handles HTTP requests
   - Serves static files
   - Implements basic API endpoints

3. **Data Storage**
   - JSON file (countries_cities.json)
   - Contains country-specific data
   - Used for validation

## Features
- **Web Interface**
  - Country selection dropdown
  - City and phone number input
  - Basic validation feedback
- **API Endpoints**
  - Get list of countries
  - Get cities for a specific country
- **Validation**
  - Basic phone number format checking
  - City-country matching

## Installation and Running

### Running the Application
1. Start the server:
```bash
python app.py
```
2. Access the web interface at http://localhost:8080

## Usage Examples

### Web Interface
1. Select a country from the dropdown
2. Enter a city and/or phone number
3. Click "Validate" to see results

### API Usage
1. Get list of countries:
```bash
curl http://localhost:8080/api/countries
```
2. Get cities for a country:
```bash
curl http://localhost:8080/api/cities/US
```

## Development

### Adding New Countries
1. Edit countries_cities.json
2. Add new country object with required fields
3. Add list of major cities

### Extending Functionality
1. Add new API endpoints as needed
2. Modify web interface to support new features
3. Enhance validation logic

## Troubleshooting

### Common Issues
1. **Invalid Phone Numbers**
   - Verify country code
   - Check phone number format
   - Ensure proper international dialing code

2. **Missing Data**
   - Verify data file exists
   - Check JSON structure
   - Ensure required fields are present

### Error Messages
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side issue

## License
This project is licensed under the MIT License - see the LICENSE file for details.
