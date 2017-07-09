import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import App from "./components/container/App";
import LoginContainer from "./components/container/LoginContainer";
import RegisterContainer from "./components/container/RegisterContainer";
import MyProfileContainer from "./components/container/MyProfileContainer";
import MyList from "./components/container/MyList";
import Default from "./components/pure/Default";


export default (store, history) => {

	const requireAuth = (nextState, replace, callback) => {
		const { user: { authenticated } } = store.getState()		
		if (!authenticated) {			
			// Takes a Location object
			// https://github.com/mjackson/history/blob/master/docs/Location.md
			replace({ nextPathname: nextState.location.pathname }, '/login')
		}
		callback();
	}	

	return( 
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Default} />
				<Route path="login" component={LoginContainer} />
				<Route path="register" component={RegisterContainer} />
				<Route path="myprofile" component={MyProfileContainer} onEnter={requireAuth} />
				<Route path="mylist" component={MyList} onEnter={requireAuth} />
			</Route>	
		</Router>	
	)	

}




