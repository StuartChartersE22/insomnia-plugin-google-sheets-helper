"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");

function format_json(json, position, formatted_json = [[]]) {
    const column = position[0]
    const row = position[1]
    const value_column = column + 1
    if (value_column === formatted_json.length){
        formatted_json.push([]);
    }
    while (formatted_json[value_column].length < row){
        // logger_1.log(`pushing cell into column ${value_column}`)
        formatted_json[value_column].push(``);
    }
    Object.entries(json).forEach(([key, value]) => {
        position[1] = formatted_json[value_column].length
        formatted_json[column].push(key);
        formatted_json = value_type_formatter_selection(value, position, formatted_json)
        while (formatted_json[column].length < formatted_json[value_column].length){
            // logger_1.log(`pushing cell into column ${column}`)
            formatted_json[column].push(``);
        }
    });
    return formatted_json;
}

function value_type_formatter_selection (value, position, formatted_json) {
    const column = position[0]
    const row = position[1]
    const value_column = column + 1
    if (value instanceof Object) {
        if (Object.keys(value).length == 0){
            // logger_1.log(`empty`);
            formatted_json[value_column].push(``);
        } else if (typeof value.length === "number"){
            // logger_1.log(`array`);
            formatted_json = format_array(value, position, formatted_json)
        } else {
            // logger_1.log(`json`);
            formatted_json = format_json(value, [value_column, row], formatted_json);
        }
    } else {
        // logger_1.log(typeof value);
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

function format_request(sheet_id, formatted_body, initial_request, top_left_a1) {
    var final_body = new Map;
    const top_left_a1_array = top_left_a1.split(``);
    const top_row = top_left_a1_array[top_left_a1_array.length - 1];
    const sheet_column_range = `${top_left_a1}:zz${formatted_body[0].length -1 + top_row}`;
    initial_request.setUrl(`https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${sheet_column_range}?valueInputOption=USER_ENTERED`);
    final_body["majorDimension"] = "COLUMNS";
    final_body["range"] = sheet_column_range;
    final_body["values"] = formatted_body;
    initial_request.setBodyText(JSON.stringify(final_body));
}

exports.format_body = format_json;
exports.format_request = format_request;