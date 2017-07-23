import { combineReducers } from "redux";
import { routerReducer as routing } from 'react-router-redux';
import { games, gamesHasErrored, gamesIsLoading, search } from './games';
import user from "./user";

export default combineReducers({
	user,
	games,
	gamesHasErrored,
	gamesIsLoading,
	search,
	routing
})