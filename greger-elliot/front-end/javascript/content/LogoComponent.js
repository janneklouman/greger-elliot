import axios 		from 'axios';
import React 		from 'react';
import {
	API_ENDPOINT_LOGO
} from '../yellow-pages';

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class LogoComponent extends React.Component {

    /**
     * LogoComponent constructor.
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);

		// Save API requests here for easy tearing down.
		this.ongoingApiRequests = [];

		// Initial state.
		this.state = {
			logo: {},
			mobileLogo: {}
		};

    };

	/**
	 * Initial setup.
	 */
	componentDidMount() {

		this.loadLogo();

	}

	/**
	 * Sends a request to the back end for the logo and updates
	 * state.
	 */
	loadLogo() {

		// Get logo data from the back end.
		let request = axios.get(API_ENDPOINT_LOGO)
			.then((result) => {

				// Update state.
				this.setState({
					logo: result.data.logo,
					mobileLogo: result.data.mobileLogo
				}); 

			});

		// Save to array of ongoing server requests.
		this.ongoingApiRequests.push(request)

	}

    /**
     * Render LogoComponent.
     *
     * @return {XML}
     */
    render() {

        return (
			<div className='logo-holder'>
				<img className='logo' src={this.state.logo.href} title={this.state.logo.title} />
				<img className='logo logo--mobile' src={this.state.mobileLogo.href} title={this.state.logo.title} />
			</div>
		);
    }

	/**
	 * Abort any active server request on unmount.
	 */
	componentWillUnmount() {

		for (let request of this.ongoingApiRequests) {
			request.abort();
		}

	}

}

// Export LogoComponent.
export default LogoComponent;
