/**
 * API paths for GregerElliotWebsite.
 *
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 */

let head = document.querySelector('head');

const API_BASE                          = head.dataset.apiBase;
const API_ENDPOINT_MENU                 = head.dataset.apiEndpointMenu;
const API_ENDPOINT_LANGUAGE_SELECTOR    = head.dataset.apiEndpointLanguageSelector;
const API_ENDPOINT_CONTENT              = head.dataset.apiEndpointContent;

export {

    API_BASE,
    API_ENDPOINT_MENU,
    API_ENDPOINT_LANGUAGE_SELECTOR,
    API_ENDPOINT_CONTENT

};