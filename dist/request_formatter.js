"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function format_body(body) {
    Object.entities(body).forEach(([key,value]) => {

    });
}

function format_request(sheet_id, formatted_body, initial_request) {
    initial_request.setUrl(`https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/A:Z?valueInputOption=USER_ENTERED`)
    initial_request.setBodyText(JSON.stringify(formatted_body));
}

exports.format_body = format_body;
exports.format_request = format_request;