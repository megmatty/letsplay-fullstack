import React from "react"
import NavigationContainer from "./NavigationContainer"

const App = React.createClass({
	render: function() {
		return(
			<div>
				<NavigationContainer />				
				{this.props.children}
				<hr/>
				<h5>					
					<iframe src="https://ghbtns.com/github-btn.html?user=kilkelly&repo=react-passport-redux-example&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe><br/>
					<a href="https://github.com/kilkelly/react-passport-redux-example">View on GitHub</a>
				</h5>

			</div>	
		)	
	}
})

export default App