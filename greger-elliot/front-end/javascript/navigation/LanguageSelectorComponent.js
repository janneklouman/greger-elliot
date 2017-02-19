import axios 		from 'axios';
import React 		from 'react';
import {
	API_ENDPOINT_LANGUAGE_SELECTOR
} from '../yellow-pages';

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebSite
 * @subpackage  i18n
 */
class LanguageSelectorComponent extends React.Component {

    /**
     * LanguageSelectorComponent constructor.
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
			languages: []
		};

	};

	/**
	 * Initial setup.
	 */
	componentDidMount() {

		this.loadLanguages(this.props.urlSegment);

	}

	/**
	 * Wait for props to be passed from API.
	 *
	 * @param   nextProps
	 */
	componentWillReceiveProps(nextProps) {

		if (this.props.urlSegment !== nextProps.urlSegment) {
			this.loadLanguages(nextProps.urlSegment);
		}

	}

	/**
	 * Sends a request to the back end to populate component.
	 *
	 * @param	urlSegment	Current url segment.
	 */
	loadLanguages(urlSegment) {

		// Load from cache if possible.
		if (urlSegment in this.finishedApiRequests) {

			// Update state.
			this.setState({
				languages: this.finishedApiRequests[urlSegment]
			});

		}

		// Use API if not in local cache.
		if (!(urlSegment in this.finishedApiRequests)) {

			// Get menu data from the back end.
			let request = axios.get(API_ENDPOINT_LANGUAGE_SELECTOR + urlSegment)
				.then( ( result ) => {

					// Update state.
					this.setState( {
						languages: result.data
					} );

					// Save to cached requests.
					this.finishedApiRequests[urlSegment] = result.data;

				} );

			// Save to array of ongoing server requests.
			this.ongoingApiRequests.push( request )

		}

	}

    /**
     * Render LanguageSelectorComponent.
     *
     * @return {XML}
     */
    render() {

		let displayLanguageSelectorItem = (item) => {

			let activeClass = item.isCurrent
				? ' language-selector__item--focused'
				: ''
				;

			return (
				<li
					key={item.lang}
					className={'language-selector__item' + activeClass}
					onClick={this.props.onLanguageChange.bind(this, item.lang)}>
					{item.name}
				</li>
			)

		};

        return (
			<div className="language-selector-holder">
				<ul className="language-selector">
					{ this.state.languages.length ? this.state.languages.map( displayLanguageSelectorItem ) : '' }
					<div className="cf"></div>
				</ul>
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

// Export LanguageSelectorComponent.
export default LanguageSelectorComponent;
