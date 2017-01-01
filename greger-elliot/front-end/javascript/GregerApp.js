import axios                from 'axios';
import React                from 'react';
import NavigationComponent  from './navigation/NavigationComponent';
import PageComponent        from './content/PageComponent';
import LogoComponent        from './content/LogoComponent';
import {
    API_ENDPOINT_MENU,
    API_ENDPOINT_LOGO,
    API_ENDPOINT_LANGUAGE_SELECTOR,
    API_ENDPOINT_CONTENT,
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

        // SilverStripe page classes for which components exist
        this.pageComponents = [
            'Page',
            'SlideShowPage'
        ];

        // todo: get from cookie
        let locale = 'sv_SE';

        // Initial state.
        this.state = {
            currentPage:    {},
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
        this.loadContent(this.state.currentPage.pageID);

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
                    currentPage: result.data[0]
                });
            });

        // Save to array of ongoing server requests.
        this.ongoingApiRequests.push(request)

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
     * Sends a request to the back end for content.
     *
     * @param   pageID  Page ID to load content from.
     */
    loadContent(pageID) {

        // Get content data from the back end based on current page id.
        let request = axios.get(API_ENDPOINT_CONTENT + pageID)
                .then((result) => {
                    this.setState({
                        currentPage: result.data
                    });
                });

        // Save to array of ongoing server requests.
        this.ongoingApiRequests.push(request)

    }

    /**
     * Click handler for navigation menu items.
     *
     * @param   page    Page object used to grab the right data from the back end.
     */
    handleOnMenuItemClick(page) {

        this.setState({currentPage: page});
        this.loadContent(page.pageID);

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
                    <LogoComponent logo={this.state.logo} />
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
                focusedMenuItemPageID={this.state.currentPage.pageID}
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

        // Dynamically render component if the class name exists as a page component.
        if (!!(this.state.currentPage.className in this.pageComponents)) {
            return React.createElement(
                this.pageComponents[this.state.currentPage.className] + 'Component',
                {
                    page: this.state.currentPage
                }
            );
        }

        return <PageComponent page={this.state.currentPage} />;

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