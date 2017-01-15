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
            'title'     	=> $this->Title,
            'menuTitle' 	=> $this->MenuTitle,
            'created'   	=> $this->Created,
            'pageID'    	=> $this->ID,
			'urlSegment' 	=> 1 === $this->ID ? '' : $this->URLSegment,
            'content'   	=> $this->Content,
            'className' 	=> $this->ClassName,
            'images'    	=> $this->imagesAsJson(),
            'key'       	=> 'page-' . $this->ID // used by react
        ];

    }

	/**
	 * @return array
	 */
    private function imagesAsJson()
    {
        $images = [];

        foreach ($this->Images() as $image) {

            $imageObject = [
                'width'       	=> $image->getWidth(),
                'height'      	=> $image->getHeight(),
                'original'    	=> $image->AbsoluteLink(),
				'originalAlt' 	=> $image->Title,
				'srcSet' 	  	=> join(', ', [
					$image->ScaleWidth(750)->AbsoluteLink() . ' 750w',
					$image->ScaleWidth(1500)->AbsoluteLink() . ' 1500w',
					$image->ScaleWidth(3000)->AbsoluteLink() . ' 3000w',
				]),
				'sizes'			=> join(', ', [
					'(max-width: 1200px) and (min-width: 769px) calc(100vw - 320px)',
					'(max-width: 768px)  and (min-width: 319px) calc(100vw - 40px)',
					'calc(100vw - 420px)'
				])
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
