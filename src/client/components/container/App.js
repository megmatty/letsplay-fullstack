import React from "react"
import NavigationContainer from "./NavigationContainer"

const App = React.createClass({
	render: function() {
		return(
			<div>
				<NavigationContainer />				
				{this.props.children}
				<hr/>
			</div>	
		)	
	}
})

export default App