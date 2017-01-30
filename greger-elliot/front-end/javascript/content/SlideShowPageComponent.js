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

		// Initial state.
		this.state = {
			currentTitle: '',
			images: []
		};
    };

	componentDidMount() {
		if (this.props.page.images.length) {
			this.setState(
				{
					currentTitle: this.props.page.images[0].originalAlt,
					images: this.props.page.images
				}
			);
		}
	}

	/**
	 * @param   nextProps
	 */
	componentWillReceiveProps(nextProps) {
		if (this.props.page.urlSegment !== nextProps.page.urlSegment) {
			this.setState({ images: nextProps.page.images });
		}
	}

	/**
	 * Handle when a new image slides into view.
	 *
	 * @param 	image
     */
	handleImageSlide(image) {
		this.setState({
			currentTitle: this.props.page.images[image].originalAlt
		});
	}

	/**
	 * Handle when the users clicks the image.
	 *
	 * @param 	image
     */
	handleImageClick(image) {
		this.imageGallery.fullScreen();
	}

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
					ref={(imageGallery) => { this.imageGallery = imageGallery; }}
					items={this.state.images}
					slideInterval={galleryOptions.slideInterval}
					lazyLoad={galleryOptions.lazyLoad}
					showNav={galleryOptions.showNav}
					showThumbnails={galleryOptions.showThumbnails}
					slideDuration={galleryOptions.slideDuration}
					autoPlay={galleryOptions.autoPlay}
					onSlide={this.handleImageSlide.bind(this)}
					onClick={this.handleImageClick.bind(this)}
				/>
				<h1 className="slide-show-description">{this.state.currentTitle}</h1>
            </article>
        );
    }

}

// Export SlideShowPageComponent.
export default SlideShowPageComponent;
