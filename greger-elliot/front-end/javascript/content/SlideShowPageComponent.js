import React                from 'react';
import ImageGallery 		from 'react-image-gallery';


/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class SlideShowPageComponent extends React.Component {

    /**
     * SlideShowPageComponent constructor.
     *
     * @param 	props
     * @param 	context
     */
    constructor(props, context) {
        super(props, context);
    };

    /**
     * Render SlideShowPageComponent.
     *
     * @return 	{XML}
     */
    render() {

		const galleryOptions = {
			slideInterval: 5000,
			slideDuration: 500,
			lazyLoad: true,
			showNav: false,
			showThumbnails: false,
			autoPlay: true
		};
		
        return (
            <article className="content-component content-component--slide-show-page">
				<ImageGallery
					items={this.props.page.images}
					slideInterval={galleryOptions.slideInterval}
					lazyLoad={galleryOptions.lazyLoad}
					showNav={galleryOptions.showNav}
					showThumbnails={galleryOptions.showThumbnails}
					slideInterval={galleryOptions.slideInterval}
					slideDuration={galleryOptions.slideDuration}
					autoPlay={galleryOptions.autoPlay}
				/>
            </article>
        );
    }

}

// Export SlideShowPageComponent.
export default SlideShowPageComponent;
