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

//Friends reducer initial state
export const initialFriendState = {
      friends: [
        { "id": 1,
          "name": "maxpower",
          "avatar": "http://www.radfaces.com/images/avatars/little-pete-wrigley.jpg"
        },
        { "id": 2,
          "name": "lisasimpson",
          "avatar": "http://www.radfaces.com/images/avatars/aeon-flux.jpg"
        },
        { "id": 3,
          "name": "HansMoleman",
          "avatar": "http://www.radfaces.com/images/avatars/artie-strongman.jpg"
        },
        { "id": 4,
          "name": "hughJass",
          "avatar": "http://www.radfaces.com/images/avatars/bradley-taylor.jpg"
        },
        { "id": 5,
          "name": "carlCcarlson",
          "avatar": "http://www.radfaces.com/images/avatars/lawrence-cohen.jpg"
        }
      ]
  };

//Friends reducer
export function friends(state = initialFriendState, action) {
	switch (action.type) {
		case 'ADD_FRIEND':
			let newId = state.friends.length + 1;
			//makes new Id for friend
			return Object.assign({}, state, {
				friends: [...state.friends, {
					id: newId,
					name: action.name,
					avatar: action.avatar
				}]
			})
		case 'DELETE_FRIEND':
			console.log(action.id);
			return Object.assign({}, state, {
				friends: state.friends.filter(friend => friend.id !== action.id)
				});
		case 'MATCH_FRIENDS':
			console.log(action, state);
			console.log('matched friends');
			return Object.assign({}, state, {

				});
		default:
			return state;
	}
}


//GamesList reducer - this isn't doing anything currently! None of this works.
//need to get state updated with changes, but in state.user.player.list not a separate array?
export function gamesList(state = [], action) {
	switch (action.type) {
		case 'LOAD_GAMES':
		console.log(state.user.player.list);
			return Object.assign({}, state, {
					gamesList: state.user.player.list
				});
		case 'DELETE_GAME':
			console.log(action.id);
			console.log('delete reducer games');
			return {
				gamesList: [...state.user.player.list.filter(game => game.id !== action.id)]
			}
				// {state.list.filter(game => game.id !== action.id)}
				// gamesList: state.gamesList.filter(game => game.id !== action.id)
				;
		// case 'ADD_GAME':
		// 	console.log(action.id);
		// 	return Object.assign({}, state, {
		// 		list: [...state.user.player.list, {
		// 			id: action.id,
		// 			name: action.name
		// 		}]
		// 	})
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
