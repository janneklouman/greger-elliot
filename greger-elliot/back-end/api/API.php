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
        'index',
        'menu',
        'language_selector',
        'content',
        'logo'
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

        $result = Helper::load_cache('GregerElliotMenuCache');

        // The cache is empty, grab from database and save to cache.
        if (empty($result)) {

            $filter = [
                'ShowInMenus' => true
            ];

            // Grab a specific page ID from the menu.
            if($specificPageUrlSegment = \Convert::raw2sql($request->param('ID'))) {
                $filter['URLSegment'] = $specificPageUrlSegment;
            }

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
        $this->getResponse()->setStatusCode(200);
        $this->getResponse()->addHeader('Content-Type', 'application/json');

        return json_encode(['sv_SE', 'en_US']);
    }

    /**
     * @param   \SS_HTTPRequest $request
     * @return  string
     */
    public function content(\SS_HTTPRequest $request)
    {

        // Set response headers and status code.
        $this->getResponse()->setStatusCode(200);
        $this->getResponse()->addHeader('Content-Type', 'application/json');

        $filter = [
            'ShowInSearch' => true
        ];

		// Grab a specific page ID from the menu.
		$specificPageUrlSegment = \Convert::raw2sql($request->param('ID'));
		if ($specificPageUrlSegment && 'undefined' !== $specificPageUrlSegment) {
			$filter['URLSegment'] = $specificPageUrlSegment;
		}

		$result = Helper::load_cache('GregerElliotContentCache' . md5($specificPageUrlSegment));

		// The cache is empty, grab from database and save to cache.
		if (empty($result)) {

			// Fetch the result.
			$result = \Page::get()->filter($filter)->first();

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
        $this->getResponse()->setStatusCode(200);
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

}
