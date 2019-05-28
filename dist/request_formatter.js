"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function format_body(body) {
    var formatted_body = [[]];
    Object.entities(body).forEach(([key,value]) => {
        formatted_body[0].push(key);
        if (value instanceof []) {
            formatted_body = add_array_value(value, formatted_body);
        } else if (value instanceof {}) {
            formatted_body = add_dict_value(value, formatted_body);
        } else {
            formatted_body.push([value]);
        }
    });
    return formatted_body;
}

function add_array_value(value, formatted_body){
    while(formatted_body[0].length < value.length) {
        formatted_body[0].push(``);
    }
    formatted_body.push(value);
    return formatted_body;
}

function add_dict_value(value, formatted_body){
    const formatted_child = format_body(value);
    while(formatted_body[0].length < formatted_child.length) {
        formatted_body[0].push(``);
    }
    formatted_body.push(formatted_child)
    return formatted_body;
}

exports.format_body = format_body;

function format_request(sheet_id, formatted_body, initial_request) {
    initial_request.setUrl(`https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/A:Z?valueInputOption=USER_ENTERED`)
    initial_request.setBodyText(JSON.stringify(formatted_body));
}

exports.format_request = format_request;