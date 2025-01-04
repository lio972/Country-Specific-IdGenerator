const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const STATIC_DIR = path.join(__dirname, 'static');

// Load country data
let countriesData;
try {
  const data = fs.readFileSync('./data/countries_cities.json', 'utf8');
  countriesData = JSON.parse(data);
  console.log(`Loaded ${countriesData.countries.length} countries`);
} catch (error) {
  console.error('Failed to load country data:', error);
  process.exit(1);
}

// Helper functions for generation
function generateName() {
  const firstNames = {
    male: ['John', 'Michael', 'David', 'James', 'Robert'],
    female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth']
  };
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
  
  const genderChoice = Math.random() > 0.5 ? 'male' : 'female';
  const firstName = firstNames[genderChoice][Math.floor(Math.random() * firstNames[genderChoice].length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return { firstName, lastName, gender: genderChoice };
}

function generateAddress(countryCode) {
  const country = countriesData.countries.find(c => c.code === countryCode);
  const streets = ['Main St', 'First Ave', 'Park Rd', 'Elm St', 'Oak St'];
  
  return {
    street: `${Math.floor(Math.random() * 1000)} ${streets[Math.floor(Math.random() * streets.length)]}`,
    city: country.cities[Math.floor(Math.random() * country.cities.length)],
    zip: Math.floor(10000 + Math.random() * 90000).toString()
  };
}

function generateSSN() {
  return `${Math.floor(100 + Math.random() * 900)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function generateCreditCard() {
  const types = ['Visa', 'MasterCard'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  // Generate valid credit card number based on type
  let number;
  if (type === 'Visa') {
    number = '4' + Array.from({length: 15}, () => Math.floor(Math.random() * 10)).join('');
  } else {
    number = '5' + Array.from({length: 15}, () => Math.floor(Math.random() * 10)).join('');
  }
  
  // Generate expiration date (1-3 years from now)
  const now = new Date();
  const expYear = now.getFullYear() + Math.floor(1 + Math.random() * 3);
  const expMonth = Math.floor(1 + Math.random() * 12);
  
  // Generate CVV
  const cvv = Math.floor(100 + Math.random() * 900).toString();
  
  return {
    type,
    number,
    expiration: `${expMonth.toString().padStart(2, '0')}/${expYear.toString().slice(-2)}`,
    cvv
  };
}

// Main generation function
function generateIdentity(countryCode) {
  const country = countriesData.countries.find(c => c.code === countryCode);
  if (!country) return null;

  const name = generateName();
  const address = generateAddress(countryCode);
  const phone = generatePhoneNumber(country.phone_pattern);
  const ssn = generateSSN();
  const creditCard = generateCreditCard();
  
  return {
    personal: {
      firstName: name.firstName,
      lastName: name.lastName,
      gender: name.gender,
      phone
    },
    address: {
      street: address.street,
      city: address.city,
      zip: address.zip,
      country: country.name
    },
    identification: {
      ssn
    },
    financial: {
      creditCard
    }
  };
}

function generatePhoneNumber(pattern) {
  const digits = pattern.match(/\d+/g).join('');
  const length = parseInt(digits);
  let phone = '+';
  for (let i = 0; i < length; i++) {
    phone += Math.floor(Math.random() * 10);
  }
  return phone;
}

const server = http.createServer((req, res) => {
  let filePath = path.join(STATIC_DIR, req.url === '/' ? 'index.html' : req.url);

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        if (req.url.startsWith('/api/')) {
          // Handle API requests
          if (req.url === '/api/countries') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(countriesData.countries.map(c => ({
              code: c.code,
              name: c.name,
              phone_code: c.phone_code
            }))));
            return;
          }

          if (req.url.startsWith('/api/cities/')) {
            const countryCode = req.url.split('/').pop();
            const country = countriesData.countries.find(c => c.code === countryCode);
            if (country) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(country.cities));
            } else {
              res.writeHead(404);
              res.end('Country not found');
            }
            return;
          }

          if (req.url.startsWith('/api/generate/')) {
            const countryCode = req.url.split('/').pop();
            const identity = generateIdentity(countryCode);
            if (identity) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(identity));
            } else {
              res.writeHead(404);
              res.end('Country not found');
            }
            return;
          }
        }
        // Page not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      } else {
        // Server error
        res.writeHead(500);
        res.end('Server Error: ' + err.code);
      }
    } else {
      // Successful response
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Serving static files from ${STATIC_DIR}`);
});
