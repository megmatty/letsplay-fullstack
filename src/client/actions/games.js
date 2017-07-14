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

//Add friend action
export function addFriend(id) {
	return {
		type: 'ADD_FRIEND',
		id
	}
}

//delete friend action
export function deleteFriend(id) {
	return {
		type: 'DELETE_FRIEND',
		id
	}
}

//delete Game Action
export function deleteGame(id) {
	return {
		type: 'DELETE_GAME',
		id
	}
}

//Add Game Action
export function addGame(id) {
	return {
		type: 'ADD_GAME',
		id
	}
}

//Capture Query Action
export function captureQuery(query) {
	return {
		type: 'CAPTURE_QUERY',
		query
	}
}

