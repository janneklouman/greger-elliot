/**
 * API paths for GregerElliotWebsite.
 *
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 */

let head = document.querySelector('head');

const API_BASE                          	= head.dataset.apiBase;
const API_ENDPOINT_MENU                 	= head.dataset.apiEndpointMenu;
const API_ENDPOINT_LOGO                 	= head.dataset.apiEndpointLogo;
const API_ENDPOINT_LANGUAGE_SELECTOR    	= head.dataset.apiEndpointLanguageSelector;
const API_ENDPOINT_CONTENT              	= head.dataset.apiEndpointContent;
const API_ENDPOINT_TRANSLATE_URL_SEGMENT 	= head.dataset.apiEndpointTranslateUrlSegment;

export {

    API_BASE,
    API_ENDPOINT_MENU,
    API_ENDPOINT_LOGO,
    API_ENDPOINT_LANGUAGE_SELECTOR,
    API_ENDPOINT_CONTENT,
	API_ENDPOINT_TRANSLATE_URL_SEGMENT

};
