/**
 * Entry point for the website. Renders a single GregerApp component
 * which is responsible for the entire site.
 *
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 */

import {
	Route,
	Router,
	browserHistory
}        from 'react-router';
import React            from 'react';
import ReactDOM         from 'react-dom';
import GregerApp        from './GregerApp';
import ContentComponent from './content/ContentComponent';

// Render GregerApp to the DOM.
ReactDOM.render(
	(
		<Router history={browserHistory}>
			<Route path="/" component={GregerApp}>
				<Route path=":urlSegment" component={ContentComponent}/>
			</Route>
		</Router>
	),
	document.querySelector( '#greger-elliot-root' )
);
