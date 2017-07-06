import { connect } from "react-redux"
import * as userActions from "../../actions/users"
import Register from "../pure/Register"

function mapStateToProps(state) {
  return {}
}

export default connect(
	mapStateToProps,
	userActions
)(Register)