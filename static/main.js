document.addEventListener('DOMContentLoaded', () => {
  // Initialize state
  let countries = [];

  // DOM Elements
  const validateButton = document.getElementById('validate');
  const generateButton = document.getElementById('generate');
  const backToMainButtons = document.querySelectorAll('.back-to-main');
  const menuButtons = document.querySelectorAll('.menu button');
  const validationOutput = document.getElementById('validation-output');
  const generationOutput = document.getElementById('generation-output');

  // Check if all required elements exist
  const requiredElements = [
    validateButton, generateButton, backToMainButtons, menuButtons,
    validationOutput, generationOutput
  ];

  if (requiredElements.some(el => !el)) {
    console.error('Missing required DOM elements');
    return;
  }

  // Load countries
  async function loadCountries() {
    try {
      const response = await fetch('/api/countries');
      if (!response.ok) throw new Error('Failed to load countries');
      
      const data = await response.json();
      countries = data;
      populateDropdowns();
    } catch (error) {
      showError('validation', 'Failed to load country data: ' + error.message);
    }
  }

  // Populate dropdowns
  function populateDropdowns() {
    const options = countries.map(country => `
      <option value="${country.code}">
        ${country.name} (${country.phone_code})
      </option>
    `).join('');

    document.getElementById('country').innerHTML = options;
    document.getElementById('gen-country').innerHTML = options;
  }

  // Show loading state
  function showLoading(screen, message) {
    const output = screen === 'validation' ? validationOutput : generationOutput;
    output.innerHTML = `<div class="loading">${message}</div>`;
  }

  // Show success message
  function showSuccess(screen, message) {
    const output = screen === 'validation' ? validationOutput : generationOutput;
    output.innerHTML = `<div class="success">${message}</div>`;
  }

  // Show error message
  function showError(screen, message) {
    const output = screen === 'validation' ? validationOutput : generationOutput;
    if (output) {
      output.innerHTML = `<div class="error">${message}</div>`;
    } else {
      console.error('Error output element not found:', message);
    }
  }

  // Navigation functions
  function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screen).classList.add('active');
  }

  // Attach event listeners
  menuButtons.forEach(button => {
    button.addEventListener('click', () => {
      showScreen(button.dataset.screen);
    });
  });

  backToMainButtons.forEach(button => {
    button.addEventListener('click', () => {
      showScreen('main-screen');
    });
  });

  // Validation functionality
  validateButton.addEventListener('click', async () => {
    const countryCode = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const phone = document.getElementById('phone').value;

    showLoading('validation', 'Validating...');

    try {
      const response = await fetch(`/api/cities/${countryCode}`);
      if (!response.ok) throw new Error('Failed to fetch cities');
      
      const cities = await response.json();
      const country = countries.find(c => c.code === countryCode);

      const cityValid = cities.includes(city);
      const phoneValid = new RegExp(country.phone_pattern).test(phone);

      showSuccess('validation', `
        Validation Results:<br>
        City: ${cityValid ? '✅ Valid' : '❌ Invalid'}<br>
        Phone: ${phoneValid ? '✅ Valid' : '❌ Invalid'}
      `);
    } catch (error) {
      showError('validation', error.message);
    }
  });

  // Generation functionality
  generateButton.addEventListener('click', async () => {
    const countryCode = document.getElementById('gen-country').value;
    showLoading('generation', 'Generating identity...');

    try {
      const response = await fetch(`/api/generate/${countryCode}`);
      if (!response.ok) throw new Error('Failed to generate identity');
      
      const data = await response.json();
      
      // Populate the form
      document.getElementById('first-name').textContent = data.personal.firstName;
      document.getElementById('last-name').textContent = data.personal.lastName;
      document.getElementById('gender').textContent = data.personal.gender;
      document.getElementById('phone').textContent = data.personal.phone;
      
      document.getElementById('street').textContent = data.address.street;
      document.getElementById('city').textContent = data.address.city;
      document.getElementById('zip').textContent = data.address.zip;
      document.getElementById('country').textContent = data.address.country;
      
      document.getElementById('ssn').textContent = data.identification.ssn;
      
      document.getElementById('card-type').textContent = data.financial.creditCard.type;
      document.getElementById('card-number').textContent = data.financial.creditCard.number;
      document.getElementById('card-exp').textContent = data.financial.creditCard.expiration;
      document.getElementById('card-cvv').textContent = data.financial.creditCard.cvv;
      
      // Show the form
      document.getElementById('identity-form').classList.remove('hidden');
    } catch (error) {
      showError('generation', error.message);
    }
  });

  // Initial load
  loadCountries();
});
