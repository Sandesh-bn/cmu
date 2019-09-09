import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';

function App() {
	return (
		<div className="wrap">
			<React.Fragment>
				<BrowserRouter>
					<Switch>
						<Route exact={true} path="/" component={Home} />
						<Route path="/home" component={Home} />
					</Switch>
				</BrowserRouter>
			</React.Fragment>
		</div>
	);
}

export default App;
