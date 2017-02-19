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
			images: [],
			isPlaying: true
		};
    };

	/**
	 * Mount component.
	 */
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

			let idx = this.imageGallery.getCurrentIndex();
			this.setState({ images: nextProps.page.images });
			this.imageGallery.slideToIndex(idx == 0 ? idx : idx - 1);

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

	slideRight() {
		let idx = this.imageGallery.getCurrentIndex();
		this.imageGallery.slideToIndex(idx + 1);
	}

	slideLeft() {
		let idx = this.imageGallery.getCurrentIndex();
		this.imageGallery.slideToIndex(idx - 1);
	}

	fullScreen() {
		this.imageGallery.fullScreen();
	}

	playOrPause() {
		if (this.state.isPlaying) {
			this.imageGallery.pause();
			this.setState({isPlaying: false});
		} else {
			this.imageGallery.play();
			this.setState({isPlaying: true});
		}
	}

	renderCustomControls() {

		return (
			<div className="image-gallery__controls">
				<img
					className="image-gallery__control"
					src="greger-elliot/front-end/dist/image/left-arrow.svg"
					onClick={this.slideLeft.bind(this)} alt="←" title={this.props.page.translations.previous} />
				<img
					className="image-gallery__control"
					src={
						this.state.isPlaying
						? 'greger-elliot/front-end/dist/image/pause.svg'
						: 'greger-elliot/front-end/dist/image/play.svg'
					}
					onClick={this.playOrPause.bind(this)} alt="➤"
					title={
						this.state.isPlaying
						? this.props.page.translations.pause
						: this.props.page.translations.play
					} />
				<img
					className="image-gallery__control"
					src="greger-elliot/front-end/dist/image/right-arrow.svg"
					onClick={this.slideRight.bind(this)} alt="→" title={this.props.page.translations.next} />
				<img
					className="image-gallery__control"
					src="greger-elliot/front-end/dist/image/full-screen.svg"
					onClick={this.fullScreen.bind(this)} alt="⤢" title={this.props.page.translations.fullScreen} />
			</div>
		);

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
			autoPlay: true,
			renderCustomControls: this.renderCustomControls.bind(this)
		};

        return (
            <article className="content-component content-component--slide-show-page">
				{
					this.state.images.length ?
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
							renderCustomControls={galleryOptions.renderCustomControls}
						/>
						: ''
				}

				<h1 className="slide-show-description">{this.state.currentTitle}</h1>
            </article>
        );
    }

	/**
	 * Abort any active server request on unmount.
	 */
	componentWillUnmount() {
		this.setState({
			images: []
		});
	}

}

// Export SlideShowPageComponent.
export default SlideShowPageComponent;
