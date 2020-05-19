# DELIVER POC

Deliver Web Tool - Proof of Concept (POC)

[Netlify Deployment](https://festive-wright-1b278f.netlify.app/)

## Mission Statement

The idea is simple... the implementation will be very hard (for me), but as everything with code, I'm sure it is possible.

Basically, what I want to accomplish with this POC is simple. Prove that the basic methods in building a webpage can be abstracted away from the underlying web APIs that exist, and opened up to a whole group of non-technical users. AKA the DOM APIs and the CSS code that styles web elements.

In web development, a developer needs to accomplish these things:

1. CREATE elements on the webpage.
2. POSITION elements within a page.
3. STYLE elements to match a design.
4. INTERACT with elements on a page.

All of these things are simple interactions that can be expressed a number of ways in code, but at the end of the day, accomplish the same thing. By abstracting out the implementations of how these simple ideas are put into effect, creating web pages can be done predictably and efficiently.

## Proof of Concept

This project is not meant to be the final tool to end all web development. This project is meant to provide a space to determine if these simple concepts can be abstracted away from their underlying implementations.

### Thesis

Our thesis being tested, is that a non-technical person can build a webpage with nothing but a mouse and keyboard from scratch - no templates.

### Objectives for Success

With our provided toolkit, user must be able to:

- [ ] ADD elements to the page.
- [ ] REMOVE elements previously added to the page.
- [ ] POSITION these elements within other elements on the page, with limited confusion.
- [ ] STYLE these elements with no prior knowledge of CSS.
- [ ] IMPLEMENT INTERACTIONS based on elements on the page.

If all of these objectives are accomplished, the experiment will be considered a success.

### Restrictions

1. This tool will only be tested against the latest browsers with the latest JS and CSS APIs available. Ergo, up to ES6 and CSS Grid.
2. Not all modern website technology will be included. We are not including modals, async functionality (AJAX calls, timeouts, etc.), animations, and so on.

# Create React App Bootstrapped Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
