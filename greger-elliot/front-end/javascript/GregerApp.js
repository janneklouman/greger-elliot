import axios                    	from 'axios';
import React                    	from 'react';
import NavigationComponent      	from './navigation/NavigationComponent';
import LanguageSelectorComponent 	from './navigation/LanguageSelectorComponent';
import ContentComponent            	from './content/ContentComponent';
import LogoComponent            	from './content/LogoComponent';
import {
    API_ENDPOINT_MENU,
    API_ENDPOINT_LOGO,
    API_ENDPOINT_LANGUAGE_SELECTOR,
	API_ENDPOINT_TRANSLATE_URL_SEGMENT
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

		// Cache all finished API requests.
		this.finishedApiRequests = {
			menu: [],
			translatedUrlSegments: {
				en: [],
				sv: []
			}
		};

        // Initial state.
        this.state = {
            urlSegment:     '',
            logo:           {},
            menuItems:      [],
            languages:      [],
            language:  		'sv'
        };

    };

	/**
	 * Wait for props to be passed from API.
	 *
	 * @param   nextProps
	 */
	componentWillReceiveProps(nextProps) {
		if (this.state.urlSegment !== nextProps.params.urlSegment) {
			this.setState({urlSegment: nextProps.params.urlSegment});
		}
	}

    /**
     * Grab initial state data from the back end on mount.
     */
    componentDidMount() {

		this.setState({ urlSegment: this.props.params.urlSegment });
        this.loadMenu(this.state.urlSegment);
        this.loadLogo();
        this.loadLanguageSelector();

    }

    /**
     * Sends a request to the back end for the menu and updates
     * state.
	 *
	 * @param	urlSegment	Current url segment.
     */
    loadMenu(urlSegment) {

		// Load from cache if possible.
		if (urlSegment in this.finishedApiRequests.menu) {

			// Update state.
			this.setState({
				menuItems: this.finishedApiRequests.menu[urlSegment]
			});

		}

		// Use API if not in local cache.
		if (!(urlSegment in this.finishedApiRequests.menu)) {

			// Get menu data from the back end.
			let request = axios.get(API_ENDPOINT_MENU + urlSegment)
				.then( ( result ) => {

					// Update state.
					this.setState( {
						menuItems: result.data
					} );

					// Save to cached requests.
					this.finishedApiRequests.menu[urlSegment] = result.data;
				} );

			// Save to array of ongoing server requests.
			this.ongoingApiRequests.push( request )

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

				// Update state.
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

					// Update state.
                    this.setState({
                        languages: result.data
                    });

                });

        // Save to array of ongoing server requests.
        this.ongoingApiRequests.push(request)

    }

	/**
	 * Translate current URL segment and update state.
	 *
	 * @param   language	A language string eg. 'en'
     */
	switchLanguage(language) {

		this.setState({ language: language });

		// Get language selector data from the back end.
		let request = axios.get( API_ENDPOINT_TRANSLATE_URL_SEGMENT + this.state.urlSegment + '/' + language )
			.then( ( result ) => {

				// Update state.
				this.setState( {
					urlSegment: result.data.translatedUrlSegment
				} );

				// Update menu.
				this.loadMenu(result.data.translatedUrlSegment);

				// Update browser URL and history.
				this.props.router.push( '/' + result.data.translatedUrlSegment );
			} );

		// Save to array of ongoing server requests.
		this.ongoingApiRequests.push( request );

	}

    /**
     * Click handler for language selector clicks.
     *
     * @param   language	A language string eg. 'en'
     */
    handleOnLanguageSelectorClick(language) {

		this.switchLanguage(language);

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
					<NavigationComponent menuItems={this.state.menuItems} />
                </section>
                <section className="second">
					<LanguageSelectorComponent
						languages={this.state.languages}
						onLanguageChange={this.handleOnLanguageSelectorClick.bind(this)}
						currentLanguage={this.state.language} />
					<ContentComponent urlSegment={this.state.urlSegment} locale={this.state.locale} />
                </section>
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
