import axios                    	from 'axios';
import React                    	from 'react';
import NavigationComponent      	from './navigation/NavigationComponent';
import LanguageSelectorComponent 	from './navigation/LanguageSelectorComponent';
import ContentComponent            	from './content/ContentComponent';
import LogoComponent            	from './content/LogoComponent';
import {
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
			hasMounted: 	false,
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

		this.setState(
			{
				urlSegment: this.props.params.urlSegment,
				hasMounted: true
			}
		);

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

        return this.state.hasMounted ? (
            <div>
                <section className="first">
                    <LogoComponent logo={this.state.logo} />
					<NavigationComponent urlSegment={this.state.urlSegment} />
                </section>
                <section className="second">
					<LanguageSelectorComponent urlSegment={this.state.urlSegment} onLanguageChange={this.handleOnLanguageSelectorClick.bind(this)} />
					<ContentComponent urlSegment={this.state.urlSegment} locale={this.state.locale} />
                </section>
            </div>
			) : null;

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
