import React from 'react';

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebSite
 * @subpackage  i18n
 */
class LanguageSelectorComponent extends React.Component {

    /**
     * LanguageSelectorComponent constructor.
     *
     * @param   props
     * @param   context
     */
    constructor(props, context) {
        super(props, context);
		
    };

    /**
     * Render LanguageSelectorComponent.
     *
     * @return {XML}
     */
    render() {

		let displayLanguageSelectorItem = (item) => {

			let activeClass = item.lang === this.props.currentLanguage
				? ' language-selector__item--focused'
				: ''
				;

			return <li
				key={item.lang}
				className={'language-selector__item' + activeClass}
				onClick={this.props.onLanguageChange.bind(this, item.lang)}>{item.name}</li>
			
		};

        return (
			<ul className="language-selector">
				{ this.props.languages ? this.props.languages.map( displayLanguageSelectorItem ) : '' }
				<div className="cf"></div>
			</ul>
		);
    }

}

// Export LanguageSelectorComponent.
export default LanguageSelectorComponent;
