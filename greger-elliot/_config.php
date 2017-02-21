<?php

global $project;
$project = 'greger-elliot';

global $database;
$database = 'greger';

require_once('conf/ConfigureFromEnv.php');

// in your _config.php
i18n::set_locale('sv_SE');
Translatable::set_default_locale('sv_SE');
Translatable::set_allowed_locales(
	[
	  'sv_SE',
	  'en_US',
	]
);

Config::inst()->update('RootURLController', 'default_homepage_link', 'bilder');
