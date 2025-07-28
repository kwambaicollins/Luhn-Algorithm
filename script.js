// Real-time card formatting
document.getElementById('cardNumber').addEventListener('input', function(e) {
    // Remove all non-digit characters
    let value = e.target.value.replace(/\D/g, '');
    
    // Add hyphens for better readability (every 4 digits)
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatted += '-';
        }
        formatted += value[i];
    }
    
    // Update the input field
    e.target.value = formatted;
});

function validateCard() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cleanedNumber = cardNumber.replace(/\D/g, ''); // Remove non-digits
    
    // Check if empty
    if (!cleanedNumber) {
        document.getElementById('result').innerText = 'Please enter a card number';
        document.getElementById('result').className = 'invalid';
        return;
    }

    // Check if length is valid (13-19 digits)
    if (cleanedNumber.length < 13 || cleanedNumber.length > 19) {
        document.getElementById('result').innerText = 'INVALID! (Wrong length)';
        document.getElementById('result').className = 'invalid';
        return;
    }

    // Luhn validation
    const isValid = verifyCardNumber(cleanedNumber);
    const issuer = detectCardIssuer(cleanedNumber);

    const resultElement = document.getElementById('result');
    if (isValid) {
        resultElement.innerHTML = `VALID! <span class="issuer">${issuer}</span>`;
        resultElement.className = 'valid';
    } else {
        resultElement.innerText = 'INVALID!';
        resultElement.className = 'invalid';
    }
}

function verifyCardNumber(cardNumber) {
    let sum = 0;
    let alternate = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i), 10);
        
        if (alternate) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        alternate = !alternate;
    }
    
    return sum % 10 === 0;
}

function detectCardIssuer(cardNumber) {
    const firstDigit = cardNumber.charAt(0);
    const firstTwoDigits = cardNumber.substring(0, 2);
    
    // Visa
    if (firstDigit === '4') return 'Visa';
    
    // Mastercard
    if (firstTwoDigits >= '51' && firstTwoDigits <= '55') return 'Mastercard';
    
    // American Express
    if (firstTwoDigits === '34' || firstTwoDigits === '37') return 'American Express';
    
    // Discover
    if (firstTwoDigits === '65' || firstFourDigits === '6011' || 
        (firstThreeDigits >= '644' && firstThreeDigits <= '649')) return 'Discover';
    
    // Diners Club
    if (firstTwoDigits === '36' || firstTwoDigits === '38' || 
        (firstTwoDigits >= '30' && firstTwoDigits <= '30')) return 'Diners Club';
    
    // JCB
    if (firstTwoDigits === '35') return 'JCB';
    
    return 'Unknown issuer';
}
