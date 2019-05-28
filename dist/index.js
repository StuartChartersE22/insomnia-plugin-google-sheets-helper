"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const logger_1 = require("./logger");
const request_formatter = require("./request_formatter");

function requestHook(context) {
    const initial_request = context.request;
    const sheet_config = config_1.getTestEnvironmentConfig(initial_request);
    if (!sheet_config) {
        return;
    }
    const sheet_id = sheet_config["sheet-id"];
    const body = initial_request.getBodyText();
    const json_body = JSON.parse(body);
    if (!json_body) {
        logger_1.log(`Body needs to be in a JSON format. Unable to parse`)
        return;
    }
    const formatted_body = request_formatter.format_body(jsonBody);
    request_formatter.format_request(sheet_id, formatted_body, initial_request);
}
exports.requestHooks = [requestHook];
