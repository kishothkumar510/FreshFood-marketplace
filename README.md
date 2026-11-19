# Fresh Foods

Fresh Foods is a small restaurant website with a React + Vite home page and an Express (Node.js) backend. The existing product, cart, reservation, and success pages remain available as HTML pages.

## Requirements

- Node.js 18 or newer
- npm (included with Node.js)

## Run locally

1. Open a terminal in the project folder.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend and backend:

   ```sh
   npm run dev
   ```

4. Open the Vite URL printed in the terminal (usually http://localhost:5173).

The backend runs on http://localhost:3002. Its health endpoint is http://localhost:3002/api/health. Feedback submissions are appended to `server/data/feedback.jsonl` on the local machine.

The shared responsive stylesheet adjusts the navigation and page layouts for mobile, tablet, laptop, and desktop sizes on all pages.

If port 3002 is already in use, choose another port in PowerShell before starting:

```powershell
$env:API_PORT=3003
npm run dev
```

## Production build

```sh
npm run build
npm start
```

Then open http://localhost:3002. `npm run preview` is also available to build and start the production server in one command.

The login and signup forms currently demonstrate page navigation only; they are not connected to real authentication.