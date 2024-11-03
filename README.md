# CRWN Clothing

A stylish online retail solution designed for an intuitive and engaging user experience. 👔👗

**About this project**<br />
Welcome to the '_CRWN Clothing_' repository, a project inspired by the capstone project from the [Complete React Developer](https://www.udemy.com/course/complete-react-developer-zero-to-mastery/) course by [Zero To Mastery](https://zerotomastery.io/).

This project serves as a detailed example, highlighting both core and advanced React.js development concepts. It covers Components, State Management, and Routing, as well as integration with _Firebase_ for data storage and authentication, and _Stripe_ for payment processing. The project is deployed using _Netlify_, including serverless functions.

Dive into the depth of [React.js](https://react.dev/) with this illustrative (Web Shop based) application.

## Getting Started

To start the application, ensure Node.js is installed on the system. Refer to the [official documentation](https://nodejs.org/en) for installation instructions. If [asdf](https://asdf-vm.com/) is being used, Node.js can also be installed via the `.tool-versions` file. More information on this is available [here](https://asdf-vm.com/manage/configuration.html#tool-versions).

Once NodeJS is installed, follow these steps to start the application:

```bash
git clone https://github.com/ThomasCode92/crwn-clothing.git
cd crwn-clothing    # navigate into project folder
npm install         # install dependencies
npm run dev         # start development server

npm test            # run the unit tests
```

To explore and contribute to this project, follow the steps above or fork the repository and submit a pull request.

### Environment variables

For this project to function properly, it's essential to set up a couple of API keys. The needed keys are for:

- [Firebase](https://firebase.google.com/), authentication and storage

For that, create the following `.env` file in the `env` folder:

```bash
VITE_API_KEY=...
VITE_AUTH_DOMAIN=...
VITE_PROJECT_ID=...
VITE_STORAGE_BUCKET=...
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=...
```

### Firebase Emulator

To use the emulator, add the following to a `.env` files in the `env` folder. The run the app without the emulator, comment out the _VITE_FIREBASE_ variables in `.env`.

```bash
# .env
VITE_FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
VITE_FIRESTORE_EMULATOR_HOST=localhost:8080

# .env.local
FIREBASE_PROJECT=...
DATA_DIRECTORY=data
```

Next run the following commands:

```bash
docker compose up -d
npm run dev
```

### Debugging

To start the application in debug mode when encountering a bug, follow these steps. First, execute the debug script by running the command `npm run debug`. Then, initiate the VS Code debugger by clicking the green play icon in the debug panel and select the `crwn-clothing` configuration. This will open a Chrome browser connected to the debugger, enabling inspection and troubleshooting of the application with ease.

## Development

This project utilizes an advanced development stack featuring [Vite](https://vitejs.dev/) and [TypeScript](https://www.typescriptlang.org/) to enhance both performance and maintainability.

- **Vite** - A modern, lightning-fast front-end build tool that offers fast development and optimized production builds.
- **TypeScript** - A statically-typed superset of JavaScript, ensuring robust type checking and better code maintainability.

### Tooling

To ensure high code quality and maintainability, this project integrates several essential tools:

- **ESLint** - For enforcing code quality and consistent coding standards.
- **Prettier** - For automated code formatting to maintain a clean and uniform codebase.
- **Husky** – Manages Git hooks to automate tasks such as pre-commit checks.

### Testing

This project incorporates a comprehensive testing setup to ensure reliability and prevent regressions.

- **Vitest** - A Vite-native testing framework that offers fast test execution and seamless integration with the existing development setup. Vitest ensures that unit tests run efficiently and remain easy to maintain.
- **React Testing Library** - A lightweight solution for testing React components by focusing on component behavior rather than implementation details. It encourages better testing practices by interacting with components the way users would, enhancing test reliability.

Tests for this project can be executed using the `npm test` command.
