import React                from 'react';
import Slider               from 'react-slick';

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class SlideShowPageComponent extends React.Component {

    /**
     * SlideShowPageComponent constructor.
     *
     * @param props
     * @param context
     */
    constructor(props, context) {
        super(props, context);
    };

    /**
     * Render SlideShowPageComponent.
     *
     * @return {XML}
     */
    render() {

        const sliderSettings = {
            lazyLoad:       'ondemand',
            infinite:       true,
            speed:          500,
            fade:           true,
            cssEase:        'linear',
            dots:           false,
            slidesToShow:   1,
            slidesToScroll: 1,
            pauseOnHover:   false,
            pauseOnFocus:   false,
            adaptiveHeight: true,
            autoplay:       true,
            autoplaySpeed: 3000
        };

        let displaySlide = (image) => {
            return (
                <img
                    src={ image.src }
                    title={ image.title }
                    key={ image.src } />
            )
        };

        return (
            <article className="content-component content-component--slide-show-page">
                <Slider {...sliderSettings}>
                    { this.props.page.images ? this.props.page.images.map( displaySlide ) : '' }
                </Slider>
            </article>
        );
    }

}

// Export SlideShowPageComponent.
export default SlideShowPageComponent;
