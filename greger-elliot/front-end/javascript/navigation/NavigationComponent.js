import axios 		from 'axios';
import React 		from 'react';
import { Link }		from 'react-router';
import {
	API_ENDPOINT_MENU
} from '../yellow-pages';

/**
 * Navigation component responsible for rendering the menu and
 * handling interactions with it.
 *
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 */
class NavigationComponent extends React.Component {

    /**
     * NavigationComponent constructor.
     *
     * @param   props
     * @param   context
     */
    constructor(props, context) {
        super(props, context);

		// Save API requests here for easy tearing down.
		this.ongoingApiRequests = [];

		// Cache all finished API requests.
		this.finishedApiRequests = [];

		// Initial state.
		this.state = {
			menuItems: []
		};

    };

	/**
	 * Initial setup.
	 */
	componentDidMount() {

		this.loadMenu(this.props.urlSegment);

	}

	/**
	 * Wait for props to be passed from API.
	 *
	 * @param   nextProps
	 */
	componentWillReceiveProps(nextProps) {

		if (this.props.urlSegment !== nextProps.urlSegment) {
			this.loadMenu(nextProps.urlSegment);
		}

	}


	/**
	 * Sends a request to the back end for the menu and updates
	 * state.
	 *
	 * @param	urlSegment	Current url segment.
	 */
	loadMenu(urlSegment) {

		// Load from cache if possible.
		if (urlSegment in this.finishedApiRequests) {

			// Update state.
			this.setState({
				menuItems: this.finishedApiRequests[urlSegment]
			});

		}

		// Use API if not in local cache.
		if (!(urlSegment in this.finishedApiRequests)) {

			// Get menu data from the back end.
			let request = axios.get(API_ENDPOINT_MENU + urlSegment)
				.then( ( result ) => {

					// Update state.
					this.setState( {
						menuItems: result.data
					} );

					// Save to cached requests.
					this.finishedApiRequests[urlSegment] = result.data;

				} );

			// Save to array of ongoing server requests.
			this.ongoingApiRequests.push( request )

		}

	}

    /**
     * Render NavigationComponent.
     *
     * @returns {XML}
     */
    render() {

        /**
         * The HTML of a single menu item.
         *
         * @param   item    Page object.
         * @returns {XML}
         */
        var displayMenuItem = (item) => {

			let activeClassName = 'menu__link--focused';

            return (
                <li key={ item.key } className='menu__item'>
                        <Link
							className='menu__link'
							activeClassName={activeClassName}
							onlyActiveOnIndex={true}
							to={ '/' + item.urlSegment } >{ item.menuTitle }</Link>
                </li>
            )
        };

        return (
            <ul className='menu'>
                { this.state.menuItems.map( displayMenuItem ) }
            </ul>
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

// Render NavigationComponent.
export default NavigationComponent;
