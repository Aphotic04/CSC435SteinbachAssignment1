/*Sources:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
*/

//Constants of inputs
const optUnitType = document.getElementById('optType')
const optFromUnit = document.getElementById('optFrom');
const optToUnit = document.getElementById('optTo');
const numFromBox = document.getElementById('numFrom');
const numToBox = document.getElementById('numTo');

//Constant 2D object array of different unit types, their units and unit values
const unitArray = {
    pressure: {
        pascal: 'Pascal (Pa)',
        bar: 'Bar',
        psi: 'Pounds per Square Inch (psi)',
        atm: 'Atmosphere (atm)',
        torr: "Torr"
    },
    length: {
        meter: 'Meter (m)', 
        kilometer: 'Kilometer (km)', 
        centimeter: 'Centimeter (cm)',
        millimeter: 'Millimeter (mm)', 
        mile: 'Mile (mi)', 
        yard: 'Yard (yd)', 
        foot: 'Foot (ft)', 
        inch: 'Inch (in)' 
    },
    mass: {
        gram: 'Gram (g)', 
        kilogram: 'Kilogram (kg)', 
        milligram: 'Milligram (mg)', 
        pound: 'Pound (lb)', 
        ounce: 'Ounce (oz)', 
        stone: 'Stone (st)', 
        ton: 'Ton (t)' 
    }
};

//Constant 2D Object arrau of different unit types, their unit values and the conversion faction of such
const conversionFactorArray = {
    pressure: {
        pascal: 1, // Base unit
        bar: 100000, // 1 Bar = 100,000 Pascal
        psi: 6894.76, // 1 PSI = 6,894.76 Pascal
        atm: 101325, // 1 Atmosphere = 101,325 Pascal
        torr: 133.3 // 1 Torr = 133.3 Pascal
    },
    length: {
        meter: 1, // Base unit
        kilometer: 1000, // 1 Kilometer = 1000 Meters
        centimeter: 0.01, // 1 Centimeter = 0.01 Meters
        millimeter: 0.001, // 1 Millimeter = 0.001 Meters
        mile: 1609, // 1 Mile = 1609 Meters
        yard: 0.094, // 1 Yard = 0.094 Meters
        foot: 0.3048, // 1 Foot = 0.3048 Meters
        inch: 0.0254 // 1 Inch = 0.0254 Meters
    },
    mass: {
        gram: 1, // Base unit
        kilogram: 1000, // 1 Kilogram = 1000 Grams
        milligram: 0.001, // 1 Milligram = 0.001 Grams
        pound: 453.592, // 1 Pound = 453.592 Grams
        ounce: 28.3495, // 1 Ounce = 28.3495 Grams
        stone: 6350.29, // 1 Stone = 6,350.29 Grams
        ton: 907184.74 // 1 Ton = 907,184.74 Grams
    }
};

/**
 * Validates user input to ensure it is a valid positive number.
 * @param {number} value - The user input value to validate.
 * @returns {number} - The validated positive number.
 * @throws {Error} - If the input is invalid (e.g., negative or empty).
 */
function validateInput(value) {
    if (value < 0) {
        throw new Error('Please enter a valid positive number.');
    }

    return value;
}

/**
 * Displays approprait units based on selected unit type.
 * @param {DOM Element} selectElement - The select element to add options to
 * @param {text} unitType - The selected unit type.
 */
function showUnits(selectElement, unitType) {
    selectElement.innerHTML = "";

    const unitLocal = unitArray[unitType];

    //Creates option for each value in array
    for (const unitValue in unitLocal) {
        const option = document.createElement('option');
        option.value = unitValue;
        option.textContent = unitLocal[unitValue];
        selectElement.appendChild(option);
    }
}

/**
 * Calculates the conversion of a number from one unit of a unit type to another
 * @param {text} unitType - The selected unit type.
 * @param {text} fromUnit - The selected original unit.
 * @param {text} toUnit - The the selected conversion unit.
 * @param {number} value - The number entered to be.
 * @returns {targetValue} - The calculated result of conversion.
 */
function calculate(unitType, fromUnit, toUnit, value) {
    const unitTypeArray = conversionFactorArray[unitType];

    const validValue = validateInput(value);

    // Convert the input value to base unit
    const valueInBase = validValue * unitTypeArray[fromUnit];

    // Convert base unit to the target unit
    const targetValue = valueInBase / unitTypeArray[toUnit]

    return targetValue;
}

/**
 * Updadtes the unit selection
 */
function updateUnits() {
    const valueUnitType = optUnitType.value;
    showUnits(optFromUnit,valueUnitType);
    showUnits(optToUnit,valueUnitType);
}

/**
 * Updates the conversion value and enters into textbox.
 */
function updateResult() {
    const valueUnitType = optUnitType.value;
    const valueFromUnit = optFromUnit.value;
    const valueToUnit = optToUnit.value;
    const valueFromNum = numFromBox.value;
    
    const valueToNum = calculate(valueUnitType, valueFromUnit, valueToUnit, valueFromNum);

    numToBox.value = valueToNum;
}

//Event listener to update the units and the number on change of unit type
optUnitType.addEventListener("change", updateUnits);
optUnitType.addEventListener("change", updateResult);

//Event listener to update results when any text or selection is chaneged
numFromBox.addEventListener("input", updateResult);
optFromUnit.addEventListener("change", updateResult);
optToUnit.addEventListener("change", updateResult);