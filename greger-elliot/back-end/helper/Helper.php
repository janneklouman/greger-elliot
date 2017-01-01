<?php

namespace GregerElliot;

/**
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 * @subpackage  Photo
 */
class Helper
{

    /**
     * @param   string  $name
     * @param   string  $class
     * @param   string  $extraBust
     * @return  mixed
     */
    public static function load_cache($name, $class = 'SiteTree', $extraBust = '')
    {
        $cacheBuster  = \DB::query('SELECT LastEdited FROM ' . $class . ' ORDER BY LastEdited DESC LIMIT 1')->value();
        $cacheKey     = $name . strtotime($cacheBuster) . $extraBust;
        $cache        = \SS_Cache::factory($name, 'Output', ['automatic_serialization' => true]);
        return $cache->load($cacheKey);
    }

    /**
     * @param   string  $name
     * @param   mixed   $data
     * @param   string  $class
     * @param   string  $extraBust
     */
    public static function save_cache($name, $data, $class = 'SiteTree', $extraBust = '')
    {
        $cacheBuster  = \DB::query('SELECT LastEdited FROM ' . $class . ' ORDER BY LastEdited DESC LIMIT 1')->value();
        $cacheKey     = $name . strtotime($cacheBuster) . $extraBust;
        $cache        = \SS_Cache::factory($name, 'Output', ['automatic_serialization' => true]);
        $cache->save($data, $cacheKey);
    }

}