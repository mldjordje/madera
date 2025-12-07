#!/usr/bin/env node
const process = require('process');

const endpoint = process.env.CMS_GALLERY_ENDPOINT;
const token = process.env.CMS_GALLERY_TOKEN;

async function main() {
  if (!endpoint) {
    console.error('CMS_GALLERY_ENDPOINT is missing. Set it in your environment and retry.');
    process.exitCode = 1;
    return;
  }

  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(endpoint, { headers });
    const contentType = response.headers.get('content-type') || '';
    const ok = response.ok;
    let body;
    try {
      body = contentType.includes('application/json') ? await response.json() : await response.text();
    } catch (parseError) {
      body = `<failed to parse: ${parseError.message}>`;
    }

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Content-Type: ${contentType}`);
    console.log('Body preview:', typeof body === 'string' ? body.slice(0, 500) : JSON.stringify(body, null, 2).slice(0, 500));

    if (!ok) {
      console.error('Request did not succeed. Adjust the endpoint/token and try again.');
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('Failed to reach CMS_GALLERY_ENDPOINT:', error.message);
    process.exitCode = 1;
  }
}

main();
