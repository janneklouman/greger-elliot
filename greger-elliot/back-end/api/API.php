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
        'content'
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

        $filter = [
            'ShowInMenus' => true
        ];

        // Grab a specific page ID from the menu.
        if ($specificPageID = (int) $request->param('ID')) {
          $filter['ID'] = $specificPageID;
        }

        // Fetch the result.
        $result = \Page::get()->filter($filter);

        return json_encode($result->toArray());
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
        if ($specificPageID = (int) $request->param('ID')) {
          $filter['ID'] = $specificPageID;
        }

        // Fetch the result.
        $result = \Page::get()->filter($filter)->first();

        return json_encode($result);
    }

}