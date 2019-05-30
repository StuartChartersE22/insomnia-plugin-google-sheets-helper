"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const a1_notation_converter = require("./a1_notation_converter");

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
    const top_left_coord = a1_notation_converter.a1_to_coord(top_left_a1);
    logger_1.log(`top_left_coord`)
    const bottom_right_coord = [formatted_body.length - 1 + top_left_coord[0], formatted_body[0].length -1 + top_left_coord];
    const sheet_column_range = `${top_left_a1}:${a1_notation_converter.coord_to_a1(bottom_right_coord)}`;
    initial_request.setUrl(`https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${sheet_column_range}?valueInputOption=USER_ENTERED`);
    final_body["majorDimension"] = "COLUMNS";
    final_body["range"] = sheet_column_range;
    final_body["values"] = formatted_body;
    initial_request.setBodyText(JSON.stringify(final_body));
}

exports.format_body = format_json;
exports.format_request = format_request;