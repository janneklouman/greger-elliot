import React from 'react';

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

        this.state = {
            focusedMenuItemPageID: this.props.focusedMenuItemPageID
        };
    };

    /**
     * Wait for props to be passed from API.
     *
     * @param   nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.focusedMenuItemPageID !== nextProps.focusedMenuItemPageID) {
            this.setState({ focusedMenuItemPageID: nextProps.focusedMenuItemPageID });
        }
    }

    /**
     * Click event handler. Updates the currently focused item index, and
     * passes a page object corresponding to the clicked item, allowing
     * the back end to fetch data corresponding to the clicked item.
     *
     * @param   item    Page object corresponding to the clicked menu item.
     */
    handleClick = (item) => {

        // Update which menu item is in focus.
        this.setState({ focusedMenuItemPageID: item.pageID });

        // Call onMenuItemClick on parent.
        this.props.onMenuItemClick(item);

    };

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

            let classes = [
                'menu-item'
            ];

            if (item.pageID === this.state.focusedMenuItemPageID) {
                classes.push('menu-item--focused');
            }

            return (
                <li key={ item.key }
                    className={ classes.join(' ') }
                    onClick={ this.handleClick.bind(this, item) }>
                        { item.menuTitle }
                </li>
            )
        };

        return (
            <ul className="menu">
                { this.props.menuItems ? this.props.menuItems.map( displayMenuItem ) : '' }
            </ul>
        );

    }

}

// Render NavigationComponent.
export default NavigationComponent;