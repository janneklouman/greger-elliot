import React 		from 'react';
import { Link }		from 'react-router';

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

			let activeClassName = 'menu-item--focused';

            return (
                <li key={ item.key }>
                        <Link
							className={'menu-item'}
							activeClassName={activeClassName}
							onlyActiveOnIndex={true}
							to={ '/' + item.urlSegment } >{ item.menuTitle }</Link>
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
