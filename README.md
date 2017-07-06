# React-Passport-Redux-Example

Demonstration of PassportJS authentication in React w/ Redux.

### Installation
First install [node.js](http://nodejs.org/) and [mongodb](https://www.mongodb.org/downloads). Then:
```sh
npm install
```
### Running in production mode
```sh
npm run start
```
then open [http://localhost:3000/](http://localhost:3000/) in your browser

### Running in development mode
(mostly to allow hot-reloading of React components)
```sh
npm run start:dev
```

### Rebuilding production files
```sh
npm run build
```

This repo demonstrates:

Main
* [`React`](https://github.com/facebook/react) for the view layer
* [`PassportJS`](https://github.com/jaredhanson/passport) for authentication (using a Local Strategy)
* [`Redux`](https://github.com/reactjs/redux) to handle our state

Secondary
* [`React Router`](https://github.com/reactjs/react-router) for routing client-side
* [`Express`](https://github.com/expressjs/express) for handling server requests (REST and page requests)
* [`MongoDB`](https://github.com/mongodb/mongo) for our database, with [`Mongoose`](https://github.com/Automattic/mongoose) handling our schema
* [`Webpack`](https://github.com/webpack) to bundle our client-side code
* Hot reloading using [`webpack-dev-middleware`](https://github.com/webpack/webpack-dev-middleware) and [`webpack-hot-middleware`](https://github.com/glenjamin/webpack-hot-middleware)

Shoutout to GitHub member choonkending whose [repo](https://github.com/choonkending/react-webpack-node) was a big help. Pull requests and comments / issue reports are most welcome!