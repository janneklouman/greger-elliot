import axios                    	from 'axios';
import React 						from 'react';
import PageComponent            	from './PageComponent';
import SlideShowPageComponent   	from './SlideShowPageComponent';
import {
	API_ENDPOINT_CONTENT
} from '../yellow-pages';

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebSite
 * @subpackage  Content
 */
class ContentComponent extends React.Component {

    /**
     * ContentComponent constructor.
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
			currentPage: {}
		};

    };

	/**
	 * Initial setup.
	 */
	componentDidMount() {

		this.loadContent(this.props.urlSegment);

	}

	/**
	 * Wait for props to be passed from API.
	 *
	 * @param   nextProps
	 */
	componentWillReceiveProps(nextProps) {
		
		if (this.props.urlSegment !== nextProps.urlSegment) {
			this.loadContent(nextProps.urlSegment);
		}
		
	}

	/**
	 * Sends a request to the back end for content.
	 *
	 * @param 	urlSegment	Passed to the API to get content from corresponding page.
	 */
	loadContent(urlSegment) {

		// Load from cache if possible.
		if (urlSegment in this.finishedApiRequests) {

			// Update state.
			this.setState({
				currentPage: this.finishedApiRequests[urlSegment]
			});

			document.title = this.state.currentPage.title + ' - Greger Elliot';

		}

		// Use API if not in local cache.
		if (!(urlSegment in this.finishedApiRequests)) {

			// Get content data from the back end based on current page id.
			let request = axios.get(API_ENDPOINT_CONTENT + urlSegment)
				.then((result) => {

					// Update state.
					this.setState({
						currentPage: result.data
					});

					document.title = this.state.currentPage.title + ' - Greger Elliot';

					// Save to cached requests.
					this.finishedApiRequests[urlSegment] = result.data;
				});

			// Save to array of ongoing server requests.
			this.ongoingApiRequests.push(request)

		}

	}

    /**
     * Render ContentComponent.
     *
     * @return {XML}
     */
    render() {
		if (this.state.currentPage) {
			return (
				'SlideShowPage' === this.state.currentPage.className
				? <SlideShowPageComponent page={this.state.currentPage} />
				: <PageComponent page={this.state.currentPage} />
			)
		}

		return null;
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

// Export ContentComponent.
export default ContentComponent;
