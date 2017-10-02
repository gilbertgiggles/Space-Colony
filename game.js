var Width = window.innerWidth;
var Height = window.innerHeight;
var ScaleFactor = ((Width / 800) / 2) + ((Height / 600) / 2); // How big everything needs to be!

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

// =====================
// General Functions
// =====================

function roundTo(number, decimals) {
    return (Number(number) + 1 / Math.pow(10, Number(decimals) + 1)).toFixed(decimals)
}

function Beautify(number, short) {
    var toReturn = number.toString();
    var currentNumber = 0;
    var cutOffDigits = 1;
    var everyThree;

    if (short) {
        everyThree = [
            '',
            ' M',
            ' B',
            ' T',
            ' Qa',
            ' Qi',
            ' Sx',
            ' Sp',
            ' Oc',
            ' No',
            ' Dc',
            ' UnD',
            ' DoD',
            ' TrD',
            ' QaD',
            ' QiD'
        ]
    } else {
        everyThree = [
            '',
            ' million',
            ' billion',
            ' trillion',
            ' quadrillion',
            ' quintillion',
            ' sextillion',
            ' septillion',
            ' octillion',
            ' nonillion',
            ' decillion',
            ' undecillion',
            ' duodecillion',
            ' tredecillion',
            ' quattuordecillion',
            ' quindecillion'
        ]
    }

    if (number >= 1000000) currentNumber = 1; // million
    if (number >= 1000000000) currentNumber = 2; // billion
    if (number >= 1000000000000) currentNumber = 3; // trillion
    if (number >= 1000000000000000) currentNumber = 4; // quadrillion
    if (number >= 1000000000000000000) currentNumber = 5; // quintillion
    if (number >= 1000000000000000000000) currentNumber = 6; // sextillion
    if (number >= 1000000000000000000000000) currentNumber = 7; // septillion
    if (number >= 1000000000000000000000000000) currentNumber = 8; // octillion
    if (number >= 1000000000000000000000000000000) currentNumber = 9; // nonillion
    if (number >= 1000000000000000000000000000000000) currentNumber = 10; // decillion
    if (number >= 1000000000000000000000000000000000000) currentNumber = 11; // undecillion
    if (number >= 1000000000000000000000000000000000000000) currentNumber = 12; // duodecillion
    if (number >= 1000000000000000000000000000000000000000000) currentNumber = 13; // tredecillion
    if (number >= 1000000000000000000000000000000000000000000000) currentNumber = 14; // quattuordecillion
    if (number >= 1000000000000000000000000000000000000000000000000) currentNumber = 15; // quindecillion
    if (number >= 1000000000000000000000000000000000000000000000000000) currentNumber = 16; // Infinite?!?!?!

    if (currentNumber != 16) { // If it does it will literally just show "infinite"
        if (number >= 1000000) {
            var numberToCutOff = "1000000";
            for (var i2 = 1; i2 < currentNumber; i2++) { // Get how many zeros to add then add them!
                numberToCutOff += "000";
            }
            cutOffDigits = parseInt(numberToCutOff);
        }

        // Now, get the first number!

        var firstNumber = number / cutOffDigits;

        // Split the number every 3s with a ","

        //var output = firstNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        var oldNumberBeforeDot = firstNumber.toString().split('.')[0];
        var oldFNumber = oldNumberBeforeDot.split('').reverse().join('');
        var newFNumber = "";
        var isThird = 0;

        for (var i = 0; i < oldFNumber.length; i++) {

            if (isThird >= 3) {
                newFNumber = "," + newFNumber;
                isThird = 0;
            }

            if (oldFNumber[i] == ".") {
                break;
            }

            newFNumber = oldFNumber[i] + newFNumber;
            isThird++;
        }

        // Check if the string has a dot!
        var hasDot = (firstNumber.toString().split('.').length > 1);

        if (hasDot) {
            // Round up...
            var rounded = roundTo(firstNumber, 3);

            var final = rounded.toString().split('.')[1];
            newFNumber += "." + final.toString();
        }

        toReturn = newFNumber + everyThree[currentNumber];
    } else toReturn = "Infinite"
    return toReturn;
}
// =====================
// Images - IMPORTANT!
// =====================

// Money symbol

var dollar_icon = new Image();

if (this.domain == null) {
    dollar_icon.src = "img\\dollar.png";
} else {
    dollar_icon.src = this.domain + "img\\dollar.png";
}

dollar_icon.onload = function() {
    Redraw();
}

// =====================
// Drawing
// =====================

Redraw = function() {
    Width = window.innerWidth;
    Height = window.innerHeight;

    var ScaleFactor = ((Width / 800) / 2) + ((Height / 600) / 2);

    c.width = Width;
    c.height = Height;

    // Draw the money displayer...
    ctx.globalAlpha = 0.5;
    ctx.drawImage(dollar_icon, Width - 200, 30, 30 * ScaleFactor, 25 * ScaleFactor);

    ctx.rect(Width - (200 * ScaleFactor), 30 * ScaleFactor, 200 * ScaleFactor, 30 * ScaleFactor);
    //ctx.Stroke();

    ctx.globalAlpha = 1;
    ctx.font = "30px Arial";
    ctx.fillText(Beautify(12352353250000000000000000000000000000000000000000, false), 10, Height - 20);
}

document.body.onresize = function() {
    Redraw();
}

Redraw();