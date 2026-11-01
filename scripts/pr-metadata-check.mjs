import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { validatePullRequest } from "./pr-standard.mjs";
const { pull_request: pr } = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
if (!pr) { console.log("No PR event; metadata qualification applies to pull requests."); process.exit(0); }
for (const newline of ["\n", "\r\n", "\r"]) {
  const body = (pr.body ?? "").replace(/\r\n?/g, "\n").replace(/\n/g, newline);
  assert.deepEqual(validatePullRequest({ title: pr.title, body }), []);
  assert.ok(validatePullRequest({ title: "invalid", body }).length);
}
console.log("Actual PR metadata: valid accepted and invalid title rejected for LF, CRLF and lone CR.");
