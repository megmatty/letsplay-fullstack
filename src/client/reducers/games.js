export function gamesHasErrored(state = false, action) {
	switch (action.type) {
		case 'GAMES_HAS_ERRORED':
			return action.hasErrored;

			default:
				return state;
	}
}

export function gamesIsLoading(state = false, action) {
	switch (action.type) {
		case 'GAMES_IS_LOADING':
			return action.isLoading;

		default: 
			return state;
	}
}


export function games(state = [], action) {
	switch (action.type) {
		case 'GAMES_GET_DATA_SUCCESS':
			return action.games;
		case 'RESET_GAMES':
			return action.games;
		default:
			return state;
	}
}

//Search reducer 
export const initialQueryState = {
	query: ''
};

export function search(state = initialQueryState, action) {
	switch (action.type) {
		case 'CAPTURE_QUERY':
		console.log(action.query, 'from reducer');
		console.log(state);
			return Object.assign({}, state, {
				query: action.query
			});
		default:
			return state;
	}
}

