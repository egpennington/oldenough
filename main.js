const ageInput = document.getElementById('age');
const countryInput = document.getElementById('country');
const resultDisplay = document.getElementById('result-display');
const checkButton = document.getElementById('btn-check');

document.getElementById('year').textContent = new Date().getFullYear();

// Set minimum drinking and driving ages for different countries
const ageLimits = {
    'USA': { minDrinkAge: 21, minDriveAge: 16 },
    'Germany': { minDrinkAge: 16, minDriveAge: 18 },
    'Japan': { minDrinkAge: 20, minDriveAge: 18 },
    'Australia': { minDrinkAge: 18, minDriveAge: 17 },
    'UK': { minDrinkAge: 18, minDriveAge: 17 },
    'Canada': { minDrinkAge: 18, minDriveAge: 16 },
    'France': { minDrinkAge: 18, minDriveAge: 18 },
    'Brazil': { minDrinkAge: 18, minDriveAge: 18 },
    'China': { minDrinkAge: 18, minDriveAge: 18 },
    'India': { minDrinkAge: 21, minDriveAge: 18 },
    'Mexico': { minDrinkAge: 18, minDriveAge: 18 },
    'South Korea': { minDrinkAge: 19, minDriveAge: 18 }
};

// Function to detect user's country based on IP address
async function detectCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const country = data.country_name;
        const countrySelect = document.getElementById('country');
        
        for (let option of countrySelect.options) {
            if (option.text === country) {
                option.selected = true;
                break;
            }
        }
    } catch (error) {
        console.error('Error detecting country:', error);
    }
}

// Call the function on page load
window.onload = detectCountry;

// Check button click event listener
checkButton.addEventListener('click', function () {
    let message = '';
    const age = parseInt(ageInput.value);
    const country = countryInput.value;
    
   if (isNaN(age)) {
        message = "Please enter your age.";
        renderMessage(message);
        return;
    }
    
    if (ageLimits[country]) {
        const { minDrinkAge, minDriveAge } = ageLimits[country];
        
        if (age < minDrinkAge && age < minDriveAge) {
            message = `I'm sorry, you cannot drink or drive ⛔`;
        } else if (age >= minDrinkAge && age < minDriveAge) {
            message = "You can drink 🍺 but you cannot drive";
        } else if (age >= minDriveAge && age < minDrinkAge) {
            message = "You can drive 🚗 but you cannot drink";
        } else {
            message = "You can drink 🍺 and drive 🚗 (not at the same time though!)";
        }
    } else {
        message = "Country not found. Please select a valid country.";
    }
    
    renderMessage(message);
});

function renderMessage(message) {
    resultDisplay.innerText = message;
}