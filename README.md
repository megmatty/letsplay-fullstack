## Let's Play
	### Let's Play is a MERN stack app that matches users to one another based on shared lists of video games for the purposes of meeting new gaming friends. The site allows a user to search the Internet Gaming Database (IGDB.com) for video games they like to play and add them to a list. They can view the game title, rating, year released, box art, and description. When other users add the same game to their list, the two users will be matched as potential gaming friends and can send an email initiating contact to arrange a meeting to play.

###Live Version: https://letsplayapp.herokuapp.com

### DEMO: To try without registering, login with :
	* email: letsplayapp123+janedoe@gmail.com 
	* password: test

### Technologies
	* MERN (MongoDB, Express, React, Node)
	* Redux & Thunk
	* Mocha/Chai
	* Webpack
	* Passport
	* Services: mlab, Travis CI, Heroku

### Future iteration points:
	* Replace email/nodemailer feature with internal messaging
	* Convert as many React class components as possible to stateless functional components
	* Create separate client/server repos/deployments
	* Develop more tests
	* Rebase deployed branch (devserver) to master

###Repo instructions

### Installation
First install [node.js](http://nodejs.org/) and [mongodb](https://www.mongodb.org/downloads). Then:
```sh
npm install
```

### Running in development mode
(mostly to allow hot-reloading of React components)
```sh
npm run start:dev
```
then open [http://localhost:3000/](http://localhost:3000/) in your browser
```

### Rebuilding production files
```sh
npm run build
```