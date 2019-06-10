"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.G_HELPER_KEY = "G_SHEET_HELPER";

exports.G_HELPER_REQUEST_REGEX = /^http:\/\/g\-sheet\-request\[\d+\]$/i;

function getGSheetEnvConfig(request) {
    let config = request.getEnvironmentVariable(exports.G_HELPER_KEY);
    return config;
}

exports.getGSheetEnvConfig = getGSheetEnvConfig;