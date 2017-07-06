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
		default:
			return state;
	}
}

//Initial state - Game List (this will eventually be empty array)
export const initialGameListState = {
	gamesList: [	  	
		{
	    "id": 10502,
	    "name": "Sid Meier’s Civilization: Beyond Earth – Rising Tide",
	    "summary": "After the first wave of great colony ships departed Earth, the jubilation of humanity was short-lived. Those left behind fell into a violent struggle over the quickly-diminishing resources on their barren home world. From this tumultuous time, four new factions arose. These newcomers were grounded not in the idealism of their predecessors, but on opportunism, resilience, ruthlessness, and above all a commitment to their own survival.\n\nNow, many decades after their first landfall on a new planet, the proud survivors of the first expeditions beyond Earth look up to see the skies darkened by a new breed of pioneers.\nBeyond Earth extended the Civilization franchise from its historical setting into the possible futures of science fiction. Rising Tide extends Beyond Earth to new frontiers on the planet’s surface and beneath its seas, adding even more choices and diplomatic options as you continue to build “just one more turn” toward a new vision for the future of humanity.",
	    "first_release_date": 1444348800000,
	    "cover": {
	      "url": "//images.igdb.com/igdb/image/upload/t_thumb/v53ubiqih4jujmibsxd7.jpg",
	      "cloudinary_id": "v53ubiqih4jujmibsxd7",
	      "width": 1523,
	      "height": 2023
	    }
	  },
		{
	    "id": 19130,
	    "name": "Sid Meier's Civilization VI",
	    "summary": "Civilization is a turn-based strategy game in which you attempt to build an empire to stand the test of time. Become Ruler of the World by establishing and leading a civilization from the Stone Age to the Information Age. Wage war, conduct diplomacy, advance your culture, and go head-to-head with history’s greatest leaders as you attempt to build the greatest civilization the world has ever known.\n\nCivilization VI offers new ways to engage with your world: cities now physically expand across the map, active research in technology and culture unlocks new potential, and competing leaders will pursue their own agendas based on their historical traits as you race for one of five ways to achieve victory in the game.",
	    "rating": 82.6507516684579,
	    "first_release_date": 1477008000000,
	    "cover": {
	      "url": "//images.igdb.com/igdb/image/upload/t_thumb/zhqjcjfltpubefktcghk.jpg",
	      "cloudinary_id": "zhqjcjfltpubefktcghk",
	      "width": 845,
	      "height": 1200
	    }
	  }
	]
}

//GamesList reducer 
export function gamesList(state = initialGameListState, action) {
	switch (action.type) {
		case 'DELETE_GAME':
			console.log(action.id);
			return Object.assign({}, state, {
				gamesList: state.gamesList.filter(game => game.id !== action.id)
				});
		case 'ADD_GAME':
			console.log(action.id);
			return Object.assign({}, state, {
				gamesList: [...state.gamesList, {
					id: action.id
				}]
			})
		default:
			return state;
	}
}


//Search reducer 
export const initialSearchState = {
	query: '',
	selectedGame: 'boo'
};

export function search(state = initialSearchState, action) {
	switch (action.type) {
		case 'SELECT_GAME_RESULT':
		console.log(action.name, 'from reducer');
			return Object.assign({}, state, {
				selectedGame: action.name
				});
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
