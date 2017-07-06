/*
	Called during development only. Allows us to use ES6 and JSX in our server code.
*/

require('babel-core/register')({
  presets: ['es2015', 'react']
});

require("./src/server/index")