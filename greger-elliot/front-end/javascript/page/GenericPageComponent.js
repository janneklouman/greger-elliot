
/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class GenericPageComponent extends React.Component {

    /**
     * GenericPageComponent constructor.
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);

        this.state = {
            title:           '',
            urlSegment:      '',
            content:         '',
            metaDescription: ''
        };

    };

    /**
     * Render GenericPageComponent.
     *
     * @return {XML}
     */
    render() {
        return <article></article>;
    }

}

// Export GenericPageComponent.
export default GenericPageComponent;
