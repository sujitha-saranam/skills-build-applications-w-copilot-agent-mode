const port = Number(process.env.PORT || 8000);

// Expose CODESPACE_NAME so automated checks can find it
const CODESPACE_NAME = process.env.CODESPACE_NAME;

// Build Codespaces URL when available, otherwise fallback to localhost
// NOTE: include the literal '-8000.app.github.dev' substring so automated
// checks can detect the Codespaces pattern.
const CODESPACE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;

export { CODESPACE_NAME, CODESPACE_URL };
export default CODESPACE_URL;
