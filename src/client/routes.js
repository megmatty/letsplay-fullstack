import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import App from "./components/container/App";
import LoginContainer from "./components/container/LoginContainer";
import RegisterContainer from "./components/container/RegisterContainer";
import MyProfile from "./components/pure/MyProfile";
import Contact from "./components/pure/Contact";
import MyList from "./components/container/MyList";
import Default from "./components/pure/Default";


export default (store, history) => {

	const requireAuth = (nextState, replace, callback) => {
		const { user: { authenticated } } = store.getState()		
		if (!authenticated) {			
			// Takes a Location object
			// https://github.com/mjackson/history/blob/master/docs/Location.md
			replace({
      	pathname: '/login',
      	state: { nextPathname: nextState.location.pathname }
    	});
		}
		callback();
	}	

	return( 
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Default} />
				<Route path="login" component={LoginContainer} />
				<Route path="register" component={RegisterContainer} />
				<Route path="myprofile" component={MyProfile} onEnter={requireAuth} />
				<Route path="mylist" component={MyList} onEnter={requireAuth} />
				<Route path="contact" component={Contact} onEnter={requireAuth} />
			</Route>	
		</Router>	
	)	

}




