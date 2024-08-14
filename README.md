<h1 align="center" style="display: flex; justify-content: center; align-items: center;">
  <br>
  Mila AI Front-End
</h1>

### Software Requirements

- VSCode (for installing recommended extensions)
- Node LTS
- Git
- Node Package Manager

### Technologies Used

- [React.js](https://reactjs.org) -- Popular SPA frontend framework
- [Tailwind CSS](https://tailwindcss.com) -- CSS framework that provides single-purpose utility classes
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) -- Small, fast and scalable status management solution
- [Typescript](https://www.typescriptlang.org/) -- Superset of JavaScript which primarily provides optional static typing, classes and interfaces.
- [Vite](https://vitejs.dev) -- Frontend tool that is used for building fast and optimized web applications
- [ESLint](https://eslint.org) -- The pluggable linting utility.
- [Prettier](https://prettier.io) -- formatting non-JS/TS files

### Setup

After cloning the repository, please follow the below commands to install packages and initialize certain features.

```bash
# install modules
npm install
```

After module is installed, run the below command to run the webapp in dev mode.

```bash
# run dev mode
npm start
```

To build the webapp, run the below command.

```bash
# build
npm build
```

Please make sure that you have environment variables within your repository.
These values should exist within `.env` file.

```
VITE_AAD_REDIRECT_URL=REDIRECT_VALUE_HERE
VITE_BACKEND_URL=BACKEND_LINK_HERE
```

Make sure that you are targeting correct backend url.
For the specific secret values, please contact **_@Mario_**

The webapp will be served on http://localhost:5173 by default.
