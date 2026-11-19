import { mkdir, appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const app = express();
const port = Number(process.env.API_PORT) || 3002;
const serverDirectory = dirname(fileURLToPath(import.meta.url));
const feedbackFile = resolve(serverDirectory, 'data', 'feedback.jsonl');
const projectDirectory = resolve(serverDirectory, '..');
const buildDirectory = resolve(projectDirectory, 'dist');

app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/feedback', async (request, response, next) => {
  const { name, email, message } = request.body ?? {};

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    !message.trim() ||
    name.trim().length > 100 ||
    email.trim().length > 254 ||
    message.trim().length > 2000
  ) {
    return response.status(400).json({ error: 'Enter a valid name, email, and message.' });
  }

  try {
    await mkdir(dirname(feedbackFile), { recursive: true });
    await appendFile(
      feedbackFile,
      `${JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        submittedAt: new Date().toISOString(),
      })}\n`,
      'utf8',
    );
    return response.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    return next(error);
  }
});

if (existsSync(buildDirectory)) {
  app.use(express.static(buildDirectory));
  app.get('*', (_request, response) => {
    response.sendFile(resolve(buildDirectory, 'index.html'));
  });
}

app.use((error, _request, response, _next) => {
  console.error('Server request failed:', error);
  response.status(500).json({ error: 'The server could not complete the request.' });
});

app.listen(port, () => {
  console.log(`Fresh Foods server listening on http://localhost:${port}`);
});