// Runs the Angular CLI with the API base URL from the environment.
//
// The site is prerendered, so the URL must be fixed at build/serve time. `API_URL` comes from
// `.env` locally, from the project's environment variables on Vercel, or from a secret in CI.
// When it is not set, no define is passed and the app falls back to the production API.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

// loadEnvFile does not override variables that are already set, so a real environment wins.
if (existsSync('.env')) process.loadEnvFile('.env');

const args = process.argv.slice(2);
const apiUrl = process.env.API_URL?.trim();
// `--define` inserts the value as code, so a string needs its quotes (JSON.stringify).
if (apiUrl) args.push('--define', `NG_API_URL=${JSON.stringify(apiUrl)}`);

const ng = createRequire(import.meta.url).resolve('@angular/cli/bin/ng.js');
const child = spawn(process.execPath, [ng, ...args], { stdio: 'inherit' });
child.on('exit', (code, signal) => process.exit(code ?? (signal ? 1 : 0)));
