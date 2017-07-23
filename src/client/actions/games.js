//Thunk allows you to write action creators that return a function instead of an action
//These are all action creators

export function gamesHasErrored(bool) {
	return {
		type: 'GAMES_HAS_ERRORED',
		hasErrored: bool
	};
}

export function gamesIsLoading(bool) {
	return {
		type: 'GAMES_IS_LOADING',
		isLoading: bool
	}
}

export function gamesGetDataSuccess(games) {
	return {
		type: 'GAMES_GET_DATA_SUCCESS',
		games: games
	}
}


//Reset Search
export function resetGames(games) {
	console.log('action resetGames');
	return {
		type: 'RESET_GAMES',
		games: []
	}
}

// export function loadGames() {
// 	return {
// 		type: 'LOAD_GAMES'
// 	}
// }


//Handles dispatching the other 3 above
export function gamesGetData(request) {
	return (dispatch) => {
		dispatch(gamesIsLoading(true));

		fetch(request)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}

				dispatch(gamesIsLoading(false));
				return response;
			})
			.then( (response) => response.json() )
			.then( (games) => dispatch(gamesGetDataSuccess(games)) )
			.catch( () => dispatch(gamesHasErrored(true)) )
	};
}

//some kind of FetchFriendList action???


//delete Game Action
export function deleteGame(id) {
	return {
		type: 'DELETE_GAME',
		id
	}
}

export function addGame(game) {
	return {
		type: 'ADD_GAME',
		game
	}
}


//Capture Query Action
export function captureQuery(query) {
	return {
		type: 'CAPTURE_QUERY',
		query
	}
}

