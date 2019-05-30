"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");

function format_json(json, position, formatted_json = [[]]) {
    const column = position[0]
    const row = position[1]
    const value_column = column + 1
    if ((value_column) === formatted_json.length){
        var row_array = [];
        while (row_array.length < row){
            row_array.push(``);
        }
        formatted_json.push(row_array);
    }
    Object.entries(json).forEach(([key, value]) => {
        while (formatted_json[column].length < formatted_json[value_column].length){
            formatted_json[column].push(``);
        }
        formatted_json[column].push(key);
        logger_1.log(`Value type: ${typeof value}`)
        if (value instanceof Array) {
            formatted_json = format_array(value, position, formatted_json); 
        } else if (value instanceof Object) {
            formatted_json = format_json(value, [value_column, row], formatted_json);
        } else {
            formatted_json[value_column].push([value]);
        }
    });
    return formatted_json;
}

function format_array(array, position, formatted_body){

}

exports.format_body = format_json;

function format_request(sheet_id, formatted_body, initial_request) {
    initial_request.setUrl(`https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/A:Z?valueInputOption=USER_ENTERED`)
    initial_request.setBodyText(JSON.stringify(formatted_body));
}

exports.format_request = format_request;