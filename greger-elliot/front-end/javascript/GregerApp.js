import axios                from 'axios';
import React                from 'react';
import NavigationComponent  from './navigation/NavigationComponent';
import {
    API_ENDPOINT_MENU,
    API_ENDPOINT_LANGUAGE_SELECTOR,
    API_ENDPOINT_CONTENT
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

        // todo: get from cookie
        let locale = 'sv_SE';

        // Save API requests here for easy tearing down.
        this.ongoingApiRequests = [];

        // Initial state.
        this.state = {
            currentPageID:  0,
            content:        '',
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
        this.loadLanguageSelector();
        this.loadContent(this.state.currentPageID);

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
                    menuItems: result.data,
                    currentPageID: result.data[0].pageID
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
     * Sends a request to the back end for content.
     *
     * @param   pageID  Page ID to load content from.
     */
    loadContent(pageID) {

        // Get content data from the back end based on current page id.
        let request = axios.get(API_ENDPOINT_CONTENT + pageID)
                .then((result) => {
                    this.setState({
                        content: result.data.content
                    });
                });

        // Save to array of ongoing server requests.
        this.ongoingApiRequests.push(request)

    }

    /**
     * Click handler for navigation menu items.
     *
     * @param   pageID    ID that is used to grab the right data from the back end.
     */
    handleOnMenuItemClick(pageID) {

        this.setState({currentPageID: pageID});
        this.loadContent(pageID);

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
                <section>
                    <h1>Current view: {this.state.currentPageID}</h1>
                    { this.renderNavigation() }
                </section>
                <section>
                    { this.renderContent() }
                </section>
                { this.renderLanguageSelector() }
            </div>
        );
    }

    /**
     * Renders the navigation.
     *
     * @returns {XML}
     */
    renderNavigation() {
        return (
            <NavigationComponent
                menuItems={this.state.menuItems}
                focusedItemPageID={this.state.currentPageID}
                onMenuItemClick={this.handleOnMenuItemClick.bind(this)}
            />
        );
    }

    /**
     * Renders the content.
     *
     * @returns {XML}
     */
    renderContent() {
        return <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
    }

    /**
     * @returns {XML}
     */
    renderLanguageSelector() {
        return <div></div>;
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