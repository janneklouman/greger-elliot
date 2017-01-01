<?php

namespace GregerElliot;

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Page
 */
class GregerElliotSiteConfigExtension extends \DataExtension
{

    /**
     * @var array
     */
    private static $has_one = [
        'Logo'  => 'Image'
    ];

    /**
     * @param \FieldList $fields
     */
    public function updateCMSFields(\FieldList $fields)
    {
        $logoField = \UploadField::create('Logo', 'Logo som visas högst upp på sajten');
        $logoField->setAllowedMaxFileNumber(1);
        $logoField->setAllowedExtensions(['jpeg','jpg','gif','png']);

        $fields->removeByName('Theme');

        $fields->addFieldToTab(
            'Root.Main',
            $logoField
        );
    }

}