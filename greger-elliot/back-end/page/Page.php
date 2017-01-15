<?php

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class Page extends SiteTree implements JsonSerializable
{

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize() {

        return [
            'title'     	=> $this->Title,
            'menuTitle' 	=> $this->MenuTitle,
            'created'   	=> $this->Created,
			'urlSegment' 	=> $this->URLSegment,
            'pageID'    	=> $this->ID,
            'content'   	=> $this->Content,
            'className' 	=> $this->ClassName,
            'key'       	=> 'page-' . $this->ID // used by react
        ];

    }

}

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class Page_Controller extends ContentController
{

    public function init()
    {
        parent::init();
    }

}
