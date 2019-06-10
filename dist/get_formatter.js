"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");

function format_get(sheet_id, json_body, initial_request, top_left_a1, btm_right_a1){
    initial_request.setUrl(`https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/${top_left_a1}:${btm_right_a1}`);
}

exports.format_get = format_get;