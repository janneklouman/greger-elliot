import axios                    	from 'axios';
import React                    	from 'react';
import NavigationComponent      	from './navigation/NavigationComponent';
import LanguageSelectorComponent 	from './navigation/LanguageSelectorComponent';
import ContentComponent            	from './content/ContentComponent';
import LogoComponent            	from './content/LogoComponent';
import {
    API_ENDPOINT_MENU,
    API_ENDPOINT_LOGO,
    API_ENDPOINT_LANGUAGE_SELECTOR
} from './yellow-pages';

/**
 * Main component housing the website.
 *
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 */
class GregerApp extends React.Component {

    /**
     * GregerApp constructor.
     *
     * @param   props
     * @param   context
     */
    constructor( props, context ) {
        super( props, context );

        // Save API requests here for easy tearing down.
        this.ongoingApiRequests = [];

        // todo: get from cookie
        let locale = 'sv_SE';

        // Initial state.
        this.state = {
            urlSegment:     this.props.location.pathname,
            logo:           {},
            menuItems:      [],
            languages:      [],
            currentLocale:  locale
        };

    };

    /**
     * Grab initial state data from the back end on mount.
     */
    componentDidMount() {

        this.loadMenu();
        this.loadLogo();
        this.loadLanguageSelector();

    }

    /**
     * Sends a request to the back end for the menu and updates
     * state.
     */
    loadMenu() {

        // Get menu data from the back end.
        let request = axios.get(API_ENDPOINT_MENU)
            .then((result) => {
                this.setState({
                    menuItems: result.data
                });
            });

        // Save to array of ongoing server requests.
        this.ongoingApiRequests.push(request)

    }

	/**
	 * Wait for props to be passed from API.
	 *
	 * @param   nextProps
	 */
	componentWillReceiveProps(nextProps) {
		if (this.state.urlSegment !== nextProps.params.urlSegment) {
			this.setState({
				urlSegment: nextProps.params.urlSegment
			});
		}
	}

    /**
     * Sends a request to the back end for the logo and updates
     * state.
     */
    loadLogo() {

        // Get logo data from the back end.
        let request = axios.get(API_ENDPOINT_LOGO)
            .then((result) => {
                this.setState({
                    logo: result.data
                });
            });

        // Save to array of ongoing server requests.
        this.ongoingApiRequests.push(request)

    }

    /**
     * Sends a request to the back end for the available languages
     * and updates state.
     */
    loadLanguageSelector() {

        // Get language selector data from the back end.
        let request = axios.get(API_ENDPOINT_LANGUAGE_SELECTOR)
                .then((result) => {
                    this.setState({
                        languages: result.data
                    });
                });

        // Save to array of ongoing server requests.
        this.ongoingApiRequests.push(request)

    }

    /**
     * Click handler for language selector clicks.
     *
     * @param   locale    The locale to set.
     */
    handleOnLanguageSelectorClick(locale) {

        this.setState({currentLocale: locale});

    }

    /**
     * Render GregerApp.
     *
     * @returns {XML}
     */
    render() {

        return (
            <div>
                <section className="first">
                    <LogoComponent logo={this.state.logo} />
					<NavigationComponent menuItems={this.state.menuItems}/>
                </section>
                <section className="second">
					<ContentComponent urlSegment={this.state.urlSegment} />
                </section>
				<LanguageSelectorComponent />
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

// Export GregerApp.
export default GregerApp;
