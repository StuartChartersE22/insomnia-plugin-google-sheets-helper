"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const logger_1 = require("./logger");
const a1_notation_converter = require("./a1_notation_converter");
const request_formatter = require("./request_formatter");

function requestHook(context) {
    const initial_request = context.request;
    const sheet_config = config_1.getTestEnvironmentConfig(initial_request);
    if (!sheet_config) {
        return;
    }
    const initial_request_url = initial_request.getUrl();
    if (initial_request_url !== "http://g-sheet-request") {
        return;
    }
    const sheet_id = sheet_config["sheet-id"];
    var top_left_a1 = "a1"
    if (sheet_config["top-left-coord"]){
        top_left_a1 = sheet_config["top-left-coord"].toLowerCase();
    }
    const body = initial_request.getBodyText();
    const json_body = JSON.parse(body);
    if (!json_body) {
        logger_1.log(`Body needs to be in a JSON format. Unable to parse`)
        return;
    }
    const formatted_body = request_formatter.format_body(json_body, [0,0]);
    // logger_1.log(`Formatted body: ${JSON.stringify(formatted_body)}`)
    // if (formatted_body.length > 26^2) {
    //     logger_1.log(`Sheet too wide, column limit reached of ZZ`)
    // }
    request_formatter.format_request(sheet_id, formatted_body, initial_request, top_left_a1);
}
exports.requestHooks = [requestHook];
