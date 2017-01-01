import React from 'react';

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class LogoComponent extends React.Component {

    /**
     * LogoComponent constructor.
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
    };

    /**
     * Render LogoComponent.
     *
     * @return {XML}
     */
    render() {

        let classes = [
            'logo'
        ];

        return <img className={classes.join(' ')} src={this.props.logo.href} />;
    }

}

// Export LogoComponent.
export default LogoComponent;
