# CRWN Clothing

## 🗃️ Repository Archived

This project has been archived as part of a shift in focus and priorities. While it served as a useful sandbox for testing and experimentation, the following reasons led to the decision:

- 🧰 **Focus on Modern Tools:** I'm now concentrating on more modern and full-featured frameworks like **Next.js** and **Nuxt.js**, which better align with my current goals and the evolving web ecosystem.
- 🧠 **Growing Backend Interest:** My interests have moved more toward backend development — building robust **APIs**, working with **databases**, and exploring server-side technologies.
- 🔬 **Experimentation Goals Met:** This repository helped me test out specific workflows and tools, including:
  - 🐋 Running the **Firebase emulator in Docker**
  - 🛎️ Creating **custom Netlify CI actions**

Since these experiments are complete and my focus has shifted, this repo will remain archived for reference purposes.

---

A stylish online retail solution designed for an intuitive and engaging user experience. 👔👗

**About this project**<br />
Welcome to the '_CRWN Clothing_' repository, a project inspired by the capstone project from the [Complete React Developer](https://www.udemy.com/course/complete-react-developer-zero-to-mastery/) course by [Zero To Mastery](https://zerotomastery.io/).

This project serves as a detailed example, highlighting both core and advanced React.js development concepts. It covers Components, State Management, and Routing, as well as integration with _Firebase_ for data storage and authentication, and _Stripe_ for payment processing. The project is deployed using _Netlify_, including serverless functions.

Dive into the depth of [React.js](https://react.dev/) with this illustrative (Web Shop based) application.

## Getting Started

Ensure that all required [environment variables](./README.md#environment-variables) are configured correctly to prevent setup errors. To start the application, verify that Docker is installed. With Docker available, the entire development setup can be launched and stopped with the following commands:

```bash
  docker compose up -d    # start react app and firebase emulator
  docker compose down -v  # stop all the services
```

### Running without Firebase Emulator

To run the application without the Firebase Emulator, ensure Node.js is installed locally. If Node.js is not already installed, refer to the [official installation](https://nodejs.org/en) guide. For those using [asdf](https://asdf-vm.com/), Node.js can also be installed via the `.tool-versions` file. Additional information is available in the [asdf configuration guide](https://asdf-vm.com/manage/configuration.html#tool-versions).

**Local Development Setup**<br />
Once Node.js is installed and environment variables are configured, follow these steps to start the application. The app will connect to the specified Firebase cloud project if the correct environment variables are provided:

```bash
npm install   # install dependencies
npm run dev   # start development server
```

### Environment variables

For this project to function properly, it's essential to set up a couple of API keys. The needed keys are for:

- [Firebase](https://firebase.google.com/), authentication and storage
- [Firebase Emulator](https://firebase.google.com/docs/emulator-suite), local development for Firebase

For that, create the following files in the `env` folder:

<details>
<summary>Environment Variables Files</summary>

**.env**

```bash
# Firebase Emulator Config
VITE_FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
VITE_FIRESTORE_EMULATOR_HOST=localhost:8080

# Firebase Local Config
DATA_DIRECTORY=data
```

**.env.local**

```bash
# Firebase Project Config
VITE_API_KEY=...
VITE_AUTH_DOMAIN=...
VITE_PROJECT_ID=...
VITE_STORAGE_BUCKET=...
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=...

# Firebase Emulator Config
FIREBASE_PROJECT=... # same as VITE_PROJECT_ID
```

</details>

### Debugging

To start the application in debug mode when encountering a bug, follow these steps. First, ensure the app is running either with `npm run start` or within a Docker container. Next, open the VS Code debugger, click the green play icon in the debug panel, and select the appropriate configuration: `crwn-clothing-local` or `crwn-clothing-docker`. This will launch a Chrome browser connected to the debugger, allowing for easy inspection and troubleshooting of the application.

## Technology Stack

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
