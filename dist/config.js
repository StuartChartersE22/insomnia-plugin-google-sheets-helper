"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.TEST_ENVIRONMENT_KEY = "G_SHEET_HELPER";

function getTestEnvironmentConfig(request) {
    let config = request.getEnvironmentVariable(exports.TEST_ENVIRONMENT_KEY);
    return config;
}

exports.getTestEnvironmentConfig = getTestEnvironmentConfig;