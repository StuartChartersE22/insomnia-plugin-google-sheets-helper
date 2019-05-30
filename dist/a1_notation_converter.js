"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");

function a1_to_coord(notation) {
    const array_of_notation = notation.split(``);
    var column_number;
    if (array_of_notation.length === 3) {
        column_number = column_letters_to_number(`${array_of_notation[0]}${array_of_notation[1]}`);
    } else {
        column_number = column_letters_to_number(array_of_notation[0]);
    }
    return [column_number, array_of_notation[array_of_notation.length - 1]]
}

function coord_to_a1(coords){
    const letters = number_to_column_letters(coords[0])
    return `${letters}${coords[1]}`
}

function column_letters_to_number(letters){
    const minor_number = letters.charCodeAt(letters.length - 1) - 97;
    logger_1.log(`minor_number: ${minor_number}`)
    var major_number = 0;
    if (letters.length === 2){
        major_number = (letters.charCodeAt(0) - 96) * 26;
        logger_1.log(`major_number: ${major_number}`)

    }
    return minor_number + major_number;
}

//  number = 0, return = A
function number_to_column_letters(number){
    const minor_letter = String.fromCharCode(97 + (number%25));
    logger_1.log(`minor_letter: ${minor_letter}, number: ${97 + (number%25)}`)
    var major_letter = '';
    if (Math.floor(number/25) !== 0){
        major_letter = String.fromCharCode(96 + (Math.floor(number/25)));
    }
    return `${major_letter}${minor_letter}`;
}

exports.a1_to_coord = a1_to_coord;
exports.coord_to_a1 = coord_to_a1;
exports.column_letters_to_number = column_letters_to_number;
exports.number_to_column_letters = number_to_column_letters;