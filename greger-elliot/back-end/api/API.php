<?php

namespace GregerElliot;

/**
 * Responsible for caching and serving data to the front end.
 *
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  API
 */
class API extends \Controller {

    /**
     * @var     array
     */
    private static $allowed_actions = [
        'menu',
        'language_selector',
        'content',
        'logo',
		'translate_url_segment'
    ];

    /**
     * @param   \SS_HTTPRequest $request
     * @return  string
     */
    public function menu(\SS_HTTPRequest $request)
    {

        // Set response headers and status code.
        $this->getResponse()->setStatusCode(200);
        $this->getResponse()->addHeader('Content-Type', 'application/json');

		// Current url segment for menu.
		$urlSegment = \Convert::raw2sql($request->param('ID'));
		$lang 		= 'sv';

		if ($urlSegment && 'undefined' !== $urlSegment) {
			\Translatable::disable_locale_filter();
			$page = \Page::get()->filter('URLSegment', $urlSegment)->first();
			if ($page) {
				$lang = $page->Locale;
			}
			\Translatable::enable_locale_filter();
		}

		// Attempt to load from cache.
        $result = Helper::load_cache('GregerElliotMenuCache' . $lang);

        // The cache is empty, grab from database and save to cache.
        if (empty($result)) {

            $filter = [
                'ShowInMenus' => true
            ];

			\Translatable::set_current_locale(\i18n::get_locale_from_lang($lang));

            // Fetch the result.
            $result = \Page::get()->filter($filter);
            $result = json_encode($result->toArray());

            // Cache the result
            Helper::save_cache('GregerElliotMenuCache', $result);

        }

        return $result;
    }

    /**
     * @param   \SS_HTTPRequest $request
     * @return  string
     */
    public function language_selector(\SS_HTTPRequest $request)
    {

        // Set response headers and status code.
        $this->getResponse()->addHeader('Content-Type', 'application/json');

		// Current url segment for menu.
		$urlSegment = \Convert::raw2sql($request->param('ID'));
		$lang 		= 'sv';

		if ($urlSegment && 'undefined' !== $urlSegment) {
			\Translatable::disable_locale_filter();
			$page = \Page::get()->filter('URLSegment', $urlSegment)->first();
			if ($page) {
				$lang = \i18n::get_lang_from_locale($page->Locale);
			}
			\Translatable::enable_locale_filter();
		}

		return json_encode(
			[
				[
					'lang' 		=> 'sv',
					'name' 		=> 'Svenska',
					'isCurrent' => 'sv' === $lang
				],
				[
					'lang' 		=> 'en',
					'name' 		=> 'English',
					'isCurrent' => 'en' === $lang
				]
			]
		);
    }

    /**
     * @param   \SS_HTTPRequest $request
     * @return  string
     */
    public function content(\SS_HTTPRequest $request)
    {

        // Set response headers and status code.
        $this->getResponse()->addHeader('Content-Type', 'application/json');

        $filter = [
            'ShowInSearch' => true
        ];

		// Grab a specific page ID from the menu.
		$specificPageUrlSegment = \Convert::raw2sql($request->param('ID'));

		if ('undefined' === $specificPageUrlSegment) {
			$specificPageUrlSegment = \Config::inst()->get('RootURLController', 'default_homepage_link');
		}

		if ($specificPageUrlSegment) {
			$filter['URLSegment'] = $specificPageUrlSegment;
		}

		$result = Helper::load_cache('GregerElliotContentCache' . md5($specificPageUrlSegment));

		// The cache is empty, grab from database and save to cache.
		if (empty($result)) {

			// Fetch the result.
			\Translatable::disable_locale_filter();
			$result = \Page::get()->filter($filter)->first();
			\Translatable::enable_locale_filter();

			// Encode the result.
			$result = json_encode($result);

			// Cache the result.
			Helper::save_cache('GregerElliotContentCache' . md5($specificPageUrlSegment), $result);

		}

        return $result;
    }

    /**
     * @param   \SS_HTTPRequest $request
     * @return  string
     */
    public function logo(\SS_HTTPRequest $request)
    {
        // Set response headers and status code.
        $this->getResponse()->addHeader('Content-Type', 'application/json');

        $result = Helper::load_cache('GregerElliotLogoCache', 'SiteConfig');

        if (empty($result)) {
            $siteConfig = \SiteConfig::current_site_config();
            $logo = $siteConfig->Logo()->ScaleWidth(640);

            $result = json_encode(
                [
                    'title'     => $logo->Title,
                    'created'   => $logo->Created,
                    'photoID'   => $logo->ID,
                    'className' => 'Image',
                    'href'      => stripslashes($logo->getAbsoluteURL()),
                    'key'       => 'photo-' . $logo->ID // used by react
                ]
            );

            Helper::save_cache('GregerElliotLogoCache', $result, 'SiteConfig');
        }

        return $result;
    }

	/**
	 * @param   \SS_HTTPRequest $request
	 * @return  string
	 */
	public function translate_url_segment(\SS_HTTPRequest $request) {

		// Set response headers and status code.
		$this->getResponse()->addHeader('Content-Type', 'application/json');

		$urlSegment = \Convert::raw2sql($request->param('ID'));

		if ('undefined' === $urlSegment) {
			$urlSegment = \Config::inst()->get('RootURLController', 'default_homepage_link');
		}

		$language 	= \Convert::raw2sql($request->param('OtherID'));

		if ($language && $urlSegment && 'undefined' !== $urlSegment && 'undefined' !== $language) {

			// Get the translated url segment.
			\Translatable::disable_locale_filter();
			$page = \Page::get()->filter(['URLSegment' => $urlSegment])->first();
			$translatedPage = $page->getTranslation(\i18n::get_locale_from_lang($language));
			$translatedPageURLSegment = $translatedPage->URLSegment;

			// Check vs defautl homepage link.
			if (\Config::inst()->get('RootURLController', 'default_homepage_link') === $translatedPageURLSegment) {
				$translatedPageURLSegment = '';
			}

			\Translatable::enable_locale_filter();

			if ($translatedPage) {
				return json_encode(
					[
						'translatedUrlSegment' => $translatedPageURLSegment
					]
				);
			}
		}

		return '';
	}

}
