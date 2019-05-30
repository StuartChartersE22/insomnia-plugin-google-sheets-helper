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
            position[1] ++
        }
        formatted_json[column].push(key);
        formatted_json = value_type_formatter_selection(value, position, formatted_json)
        position[1] ++
    });
    return formatted_json;
}

function value_type_formatter_selection (value, position, formatted_json) {
    const column = position[0]
    const row = position[1]
    const value_column = column + 1
    if (value instanceof Object) {
        logger_1.log(`value type of: ${typeof value.length}`)
        if (typeof value.length === "number"){
            logger_1.log(`array`)
            formatted_json = format_array(value, position, formatted_json)
        } else {
            logger_1.log(`json`)
            formatted_json = format_json(value, [value_column, row], formatted_json);
        }
    } else {
        formatted_json[value_column].push(value);
    }
    return formatted_json;
}

function format_array(array, position, formatted_json){
    array.forEach((value) => {
        formatted_json = value_type_formatter_selection (value, position, formatted_json)
    })
    return formatted_json;
}

function format_request(sheet_id, formatted_body, initial_request) {
    var final_body = new Map;
    const sheet_column_range = `A:${String.fromCharCode(96 + formatted_body.length)}`;
    initial_request.setUrl(`https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${sheet_column_range}?valueInputOption=USER_ENTERED`);
    final_body["majorDimension"] = "COLUMNS";
    final_body["range"] = sheet_column_range;
    final_body["values"] = formatted_body;
    initial_request.setBodyText(JSON.stringify(final_body));
}

exports.format_body = format_json;
exports.format_request = format_request;