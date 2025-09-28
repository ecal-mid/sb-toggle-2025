import { Command } from "commander";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";
const program = new Command();

program
  .name("build")
  .description("Custom Vite build script")
  .option("-i, --input <type>", "input type")
  .option("-m, --mode <type>", "mode", "build")
  .parse();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const options = program.opts();

const foundInputs = fs
  .readdirSync(path.join(__dirname, "animations"), { recursive: true })
  .filter((file) => file.endsWith("/index.html"))
  .map((file) => file.replace(/\/index.html$/, ""));

if (!options.input && options.mode === "preview") {
  console.error(
    `Input is required!\n\nAvailable commands:\n  ${foundInputs
      .map((input) => `pnpm ${options.mode} -i ${input}`)
      .join("\n  ")}\n\n`
  );
  process.exit(1);
}

// Set environment variables
process.env.VITE_INPUT = options.input;
// find all index.html

const indexFiles = options.input ? [options.input] : foundInputs;

(async () => {
  for (const input of indexFiles) {
    process.env.VITE_INPUT = input;
    console.log(`\n--- Running "pnpm run ${options.mode} -i ${input}" ---\n`);

    // Spawn a new Vite process
    const vite = spawn("vite", [options.mode], { stdio: "inherit" });
    await new Promise((resolve, reject) => {
      vite.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Vite process exited with code ${code}`));
          return;
        }
        resolve();
      });
    });
  }
})();