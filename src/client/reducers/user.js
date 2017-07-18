import { 
	MANUAL_LOGIN_USER,
	LOGIN_SUCCESS_USER,
	LOGIN_ERROR_USER,
	SIGNUP_USER,
	SIGNUP_SUCCESS_USER,
	SIGNUP_ERROR_USER,
	LOGOUT_USER,
	LOGOUT_SUCCESS_USER,
	LOGOUT_ERROR_USER,
	REGISTER_USER,
	REGISTER_SUCCESS_USER,
	REGISTER_ERROR_USER,
	DELETE_GAME,
	ADD_GAME
} from "../constants";

const user = (state = {
	isWaiting: false,
	authenticated: false,
	email: "",
	player: ""
}, action) => {
	switch(action.type) {
		case MANUAL_LOGIN_USER:
			return Object.assign({}, state, { isWaiting: true });
		case LOGIN_SUCCESS_USER:
			console.log(action);
			return Object.assign({}, state, { isWaiting: false, authenticated: true, email: action.data.email, player: action.data.player });
		case LOGIN_ERROR_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: false });
		case SIGNUP_USER:
			return Object.assign({}, state, { isWaiting: true });
		case SIGNUP_SUCCESS_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: true });
		case SIGNUP_ERROR_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: false });
		case LOGOUT_USER:
			return Object.assign({}, state, { isWaiting: true });
		case LOGOUT_SUCCESS_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: false, email: "" });
		case LOGOUT_ERROR_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: true });
		case REGISTER_USER:
			return Object.assign({}, state, { isWaiting: true });
		case REGISTER_SUCCESS_USER:
			return Object.assign({}, state, { isWaiting: false });
		case REGISTER_ERROR_USER:
			return Object.assign({}, state, { isWaiting: false });

		case DELETE_GAME:
			console.log(action.id);
			console.log('delete reducer fired');
			// var object = {};
			// object.player = state.player;
			// object.listChanged = Date.now();
			// object.player.list = state.player.list.filter(game => game.id !== action.id);
			// return Object.assign({}, state, object);
			return {
				...state,
				player: {
					...state.player,
					list: state.player.list.filter(game => game.id !== action.id)
				}
			}
			//this is the working solution!

			case ADD_GAME:
				console.log(action.id);
				console.log('action reducer fired');
				// var object = {};
				// object.player = state.player;
				// object.listChanged = Date.now();
				// //not triggering mapstatetoprops on state change without Date.now()??
				// object.player.list = state.player.list.concat(action.game);
				// return Object.assign({}, state, object);
				return {
					...state,
					player: {
						...state.player,
						list: state.player.list.concat(action.game)
					}
				}
				//this is the working solution!
		default:
			return state;
	}
}

export default user;