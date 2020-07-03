## Notes App

The app is responsive and connected to API [https://private-9aad-note10.apiary-mock.com](https://private-9aad-note10.apiary-mock.com)

In app can:
* Shows Note list
* Add / Edit / Delete Note (API is mock. You can only checking sending requests)
* Change locales (CS|EN|DE)

App using:
* Design - [Material UI](https://material-ui.com) using own implementation of [JSS](https://material-ui.com/styles/basics) under the hood
* Internationalization - [FormatJS/React-intl](https://formatjs.io/docs/react-intl)

Demo runs on [Vercel](https://notes-sand.vercel.app)

## Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Some settings were override with use [customize-cra](https://github.com/arackaf/customize-cra) and [react-app-rewired](https://github.com/timarney/react-app-rewired#readme).

* clone the repo `git clone https://github.com/romankuzmin/notes.git`
* run `npm install` or `yarn`

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test` or `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject` or `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn lint` or `npm run lint`

Checks the code to see if it respects [Eslint's](https://eslint.org/) rules

### `yarn release` or `npm run release`

Release app by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) and use [standard-version](https://github.com/conventional-changelog/standard-version)   

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
