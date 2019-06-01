"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const logger_1 = require("./logger");
const request_formatter = require("./request_formatter");

function requestHook(context) {
    const initial_request = context.request;
    const initial_request_url = initial_request.getUrl();
    if (!initial_request_url.match(/^http:\/\/g\-sheet\-request\[\d+\]$/i)) {
        return;
    }
    const sheet_option_number = Number(initial_request_url.substring(initial_request_url.indexOf("[") + 1, initial_request_url.indexOf("]")));
    const sheet_config = config_1.getTestEnvironmentConfig(initial_request)[sheet_option_number];
    if (!sheet_config) {
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
    request_formatter.format_request(sheet_id, formatted_body, initial_request, top_left_a1);
}
exports.requestHooks = [requestHook];
