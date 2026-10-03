# Cardinal Bakeshop

This is the first local React starter in the owner's step-by-step website tutorial. It shows the brand name, tagline, menu introduction, and supplied social links. Product shopping and payments are later stages, not implemented features.

## Run locally in VS Code

1. Open this folder in VS Code.
2. Choose **Terminal > New Terminal**.
3. If dependencies are absent, run `npm.cmd install`.
4. Run `npm.cmd run dev` and open the Local URL printed by Vite, normally http://127.0.0.1:5173.
5. Edit `src/App.jsx`, save, and watch the browser update.
6. Press Ctrl+C in the terminal to stop the development server.

`npm.cmd` runs npm's Windows command launcher directly, avoiding PowerShell execution-policy errors from npm.ps1.

## Files

- `src/App.jsx`: visible React page.
- `src/App.css`: starter page styling.
- `src/main.jsx`: mounts the React page.
- `src/data/menu.json`: 47 menu entries transcribed from the supplied image; not yet connected to the page.
- `references/price-list.png`: unchanged owner-supplied source.
- `PROJECT-BRIEF.md`: project context and remaining stages.

## Video differences

This project uses React with Vite, as described in React's current from-scratch documentation: https://react.dev/learn/build-a-react-app-from-scratch

- Start the local server with `npm.cmd run dev` rather than `npm start`.
- Vite's default development port is 5173.
- Build with `npm.cmd run build`.
- Production output goes into `dist`, which is the directory to select during the later Firebase Hosting setup.

Nothing has been published and no live payment integration exists yet.
