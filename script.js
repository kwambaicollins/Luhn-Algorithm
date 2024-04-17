function validateCard() {
    var cardNumber = document.getElementById("cardNumber").value;
    var cardTranslation = {'-': '', ' ': ''};
    var translatedCardNumber = translateCardNumber(cardNumber, cardTranslation);

    if (verifyCardNumber(translatedCardNumber)) {
        document.getElementById("result").innerText = "VALID!";
    } else {
        document.getElementById("result").innerText = "INVALID!";
    }
}

function translateCardNumber(cardNumber, translation) {
    return cardNumber.replace(/[- ]/g, function(match) {
        return translation[match];
    });
}

function verifyCardNumber(cardNumber) {
    var sumOfOddDigits = 0;
    var cardNumberReversed = cardNumber.split('').reverse().join('');
    var oddDigits = cardNumberReversed.split('').filter(function(_, index) {
        return index % 2 === 0;
    });

    oddDigits.forEach(function(digit) {
        sumOfOddDigits += parseInt(digit, 10);
    });

    var sumOfEvenDigits = 0;
    var evenDigits = cardNumberReversed.split('').filter(function(_, index) {
        return index % 2 === 1;
    });

    evenDigits.forEach(function(digit) {
        var number = parseInt(digit, 10) * 2;
        if (number >= 10) {
            number = Math.floor(number / 10) + (number % 10);
        }
        sumOfEvenDigits += number;
    });

    var total = sumOfOddDigits + sumOfEvenDigits;
    return total % 10 === 0;
}
