// Create a JavaScript library that provides advanced data transformation functions. 
//The library should include the following features:
// addValues: Accepts two arguments of any type and performs the appropriate addition operation 
//based on the types of the arguments. The function should return the result of the addition. 
//If the addition is not possible, it should throw an error.
// stringifyValue: Accepts a single argument of any type and converts it to a string representation. 
//For objects and arrays, use JSON.stringify() for serialization. For other types, use the appropriate 
//built-in methods or operations to convert them to strings.
// invertBoolean: Accepts a single boolean argument and returns its inverted value. 
//If the argument is not a boolean, it should throw an error.
// convertToNumber: Accepts a single argument of any type and attempts to convert it to a number. 
//For strings, use parseFloat() or parseInt() for conversion. 
//For other types, use appropriate operations or functions to perform the conversion. 
//If the conversion is not possible, it should throw an error.
// coerceToType: Accepts two arguments: value and type. 
//It attempts to convert the value to the specified type using type coercion. 
//The function should return the coerced value if successful. 
//If the coercion is not possible, it should throw an error.
// (Optional) Implement additional functions of your choice that demonstrate advanced 
//type conversion scenarios or cater to specific use cases related to primitive types. 
//You are encouraged to explore complex scenarios and push the limits of type conversion.

class DataTransformation {
    constructor() {
        this.datatypes = {
            string: 'string',
            number: 'number',
            object: 'object',
            boolean: 'boolean',
            null: 'object',
            undefined: 'undefined',
            array: 'array',
            function: 'function',
            bigint: 'bigint',
            symbol: 'symbol',
        }
        this.falsyData= {
            "": true,
            "null": true,
            "undefined": true,
            "false": true,
            "0": true,
            "NaN": true,
            "-0": true,
        }
    }
    addValues(a, b) {
        if (this.datatypes[typeof a] === this.datatypes[typeof b] && this.datatypes[typeof b] === this.datatypes.bigint) {
            return a + b;
        } 

        if (this.datatypes[typeof a] === this.datatypes[typeof b] && this.datatypes[typeof b] === this.datatypes.number) {
            return a + b;
        } 
        if (this.datatypes[typeof a] === this.datatypes.string
             && this.datatypes[typeof b] === this.datatypes.string 
             || Array.isArray(a) 
             || Array.isArray(b)) {
            return String(a) + String(b);
        } else {
            throw new Error("Addition is not possible with provided types");
        }
    }

    stringifyValue (value) {
        if (this.datatypes[typeof value] === 'boolean' && value !== null) {
            return JSON.stringify(value);
        } else {
            return String(value);
            //return '' + value;
            //return value.toString();
        }
    }

    //I dont understand this, its very simple to do, so i think variances in this function that comment is better
    invertBoolean (value) {
        if (this.datatypes[typeof value] === 'boolean') {
            return !value;
        } else {
            throw new Error("Argument is not a boolean");
        }
        // if (this.falsyData[value]) {
        //     return this.falsyData[value];
        // } 
        // if (!(value in this.falsyData)) {
        //     return false
        // }
        // throw new Error("Argument cannot convert to boolean");
    }

    convertToNumber (value) {
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue)) {
            return parsedValue;
        } else {
            throw new Error("Conversion to number is not possible");
        }
    }

    coerceToType (value, type) {
        switch (type) {
            case 'number':
                return this.convertToNumber(value);
            case 'boolean':
                return Boolean(value);
            case 'string':
                return this.stringifyValue(value);
            default:
                throw new Error("Unsupported type");
        }
    }
}

const transformator = new DataTransformation()

try {
    console.log(transformator.addValues(5, 10)); // виведе: 15
    console.log(transformator.addValues("Hello", "World")); // виведе: HelloWorld
    console.log(transformator.addValues(5, "World")); // виведе: '5World'
    console.log(transformator.addValues([], 1)) // виведе: '1'
    console.log(transformator.addValues([], 0))// виведе: '0'
    console.log(transformator.addValues(['Hello'], 0))// виведе: 'Hello0'
    console.log(transformator.addValues(1, []))// виведе: '1'
    console.log(transformator.addValues(1, ['Hello']))// виведе: '1Hello'
    console.log(transformator.addValues(0, ['Hello']))// виведе: '0Hello'
    console.log(transformator.addValues({}, 1))// виведе: помилка
    console.log(transformator.addValues(1, {}))// виведе: помилка
    console.log(transformator.addValues(null, 1))// виведе: '1'
    console.log(transformator.addValues(undefined, 1))// виведе: помилка
    console.log(transformator.addValues("Hello", null))// виведе: 'Hellonull'
    console.log(transformator.addValues("Hello", undefined))// виведе: 'Helloundefined'
    console.log(transformator.addValues("Hello", function () { }))// виведе: 'Hellofunction(){}'
    console.log(transformator.addValues(function () { }, 1))// виведе: 'function(){}1'
    console.log(transformator.addValues(52858825284848254874818517471744n, 52858825284848254874818517471744n))// виведе: 'function(){}52858825284848254874818517471744'
    console.log(transformator.addValues(function () { }, 52858825284848254874818517471744n))// виведе: 'function(){}52858825284848254874818517471744'
    console.log(transformator.addValues(1, 52858825284848254874818517471744n))// виведе: 'помилка'
    
    
    console.log(transformator.invertBoolean(0))//true
    console.log(transformator.invertBoolean(-0))//true
    console.log(transformator.invertBoolean(""))//true
    console.log(transformator.invertBoolean(false))//true
    console.log(transformator.invertBoolean("hbgvfcd"))//false
    console.log(transformator.invertBoolean(NaN))//true
    console.log(transformator.invertBoolean(null))//true
    console.log(transformator.invertBoolean(undefined))//true
    console.log(transformator.invertBoolean({}))//false

    console.log(transformator.addValues(5, 10)); // виведе: 15
    console.log(transformator.addValues("Hello", "World")); // виведе: HelloWorld
    console.log(transformator.stringifyValue({ key: "value" })); // виведе: [object Object]
    console.log(transformator.invertBoolean(true)); // виведе: false
    console.log(transformator.convertToNumber("10")); // виведе: 10
    console.log(transformator.coerceToType("true", "boolean")); // виведе: true
} catch (error) {
    console.error(error.message);
}

