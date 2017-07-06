import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux";
import { games, gamesHasErrored, gamesIsLoading, friends, gamesList, search } from './games';
import user from "./user"

export default combineReducers({
	user,
	games,
	gamesHasErrored,
	gamesIsLoading,
	friends,
	gamesList,
	search,
	routing: routerReducer
})