<?php

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class SlideShowPage extends Page implements JsonSerializable
{

    /**
     * @var array
     */
    private static $many_many = [
        'Images' => 'Image'
    ];

    /**
     * @return FieldList
     */
    public function getCMSFields() {

        $fields = parent::getCMSFields();

        $imagesField = UploadField::create(
            'Images',
            'Bilder'
        );
        $imagesField->getValidator()->setAllowedExtensions(['jpg','png','gif','jpeg']);

        $fields->insertBefore('Content', $imagesField);
        $fields->removeByName('Content');
        return $fields;

    }

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    public function jsonSerialize() {

        return [
            'title'     => $this->Title,
            'menuTitle' => $this->MenuTitle,
            'created'   => $this->Created,
            'pageID'    => $this->ID,
            'content'   => $this->Content,
            'className' => $this->ClassName,
            'images'    => $this->imagesAsJson(),
            'key'       => 'page-' . $this->ID // used by react
        ];

    }

    private function imagesAsJson()
    {
        $images = [];

        foreach ($this->Images() as $image) {

            $imageObject = [
                'title'     => $image->Title,
                'width'     => $image->getWidth(),
                'height'    => $image->getHeight(),
                'src'       => $image->AbsoluteLink()
            ];


            $images[] = $imageObject;
        }

        return $images;
    }

}

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class SlideShowPage_Controller extends Page_Controller
{

    public function init()
    {
        parent::init();
    }

}
