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
			menuItems: [],
			language: '',
			isExpanded: false
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
				menuItems: this.finishedApiRequests[urlSegment],
				language: this.finishedApiRequests[urlSegment][0].language
			});

		}

		// Use API if not in local cache.
		if (!(urlSegment in this.finishedApiRequests)) {

			// Get menu data from the back end.
			let request = axios.get(API_ENDPOINT_MENU + urlSegment)
				.then( ( result ) => {

					// Update state.
					this.setState( {
						menuItems: result.data,
						language: result.data[0].language
					} );

					// Save to cached requests.
					this.finishedApiRequests[urlSegment] = result.data;

				} );

			// Save to array of ongoing server requests.
			this.ongoingApiRequests.push( request )

		}

	}

	/**
	 * Expands or hides mobile navigation.
	 */
	expandOrHideMenu() {
		if (this.state.isExpanded) {
		this.setState({ isExpanded: false });
		} else {
			this.setState({ isExpanded: true });
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
							className='menu__link menu__link--large-mobile'
							activeClassName={activeClassName}
							onlyActiveOnIndex={true}
							onClick={this.expandOrHideMenu.bind(this)}
							to={ '/' + item.urlSegment } >{ item.menuTitle }</Link>
                </li>
            )
        };

		// Todo get translations form back end.
		let expandText 	= 'sv' === this.state.language ?  'Meny' : 'Menu';
		let hideText 	= 'sv' === this.state.language ? 'Dölj menyn' : 'Hide menu';
		let menuText 	= this.state.isExpanded ? hideText : expandText;
		let expandClass = this.state.isExpanded ? ' menu--expanded' : '';

        return (
			<div>
				<ul className={ 'menu' + expandClass }>
					{ this.state.menuItems.map( displayMenuItem ) }
				</ul>
				<a href="javascript:void(0)"
				   className='menu__link menu__link--mobile-expand'
				   onClick={this.expandOrHideMenu.bind(this)}>{ menuText }</a>
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

// Render NavigationComponent.
export default NavigationComponent;
