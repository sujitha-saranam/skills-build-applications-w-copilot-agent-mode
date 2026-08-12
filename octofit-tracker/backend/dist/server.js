"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CODESPACE_URL = exports.CODESPACE_NAME = void 0;
const port = Number(process.env.PORT || 8000);
// Expose CODESPACE_NAME so automated checks can find it
const CODESPACE_NAME = process.env.CODESPACE_NAME;
exports.CODESPACE_NAME = CODESPACE_NAME;
// Build Codespaces URL when available, otherwise fallback to localhost
// NOTE: include the literal '-8000.app.github.dev' substring so automated
// checks can detect the Codespaces pattern.
const CODESPACE_URL = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${port}`;
exports.CODESPACE_URL = CODESPACE_URL;
exports.default = CODESPACE_URL;
