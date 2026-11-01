import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
const tests = ["scripts/pr-standard.test.mjs", "scripts/enforce-pr-standard.test.mjs", ...readdirSync("scripts/worktree").filter(x => x.endsWith(".test.mjs")).map(x => `scripts/worktree/${x}`), ...readdirSync("evals").filter(x => x.endsWith(".test.mjs")).map(x => `evals/${x}`)];
const result = spawnSync(process.execPath, ["--test", "--test-concurrency=1", ...tests], { stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
