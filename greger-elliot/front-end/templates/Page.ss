<!DOCTYPE html>
<html lang="$ContentLocale" data-title-base="$SiteConfig.Title">
    <head
        data-api-base="{$AbsoluteBaseURL}api/v1/"
        data-api-endpoint-menu="{$AbsoluteBaseURL}api/v1/menu/"
        data-api-endpoint-logo="{$AbsoluteBaseURL}api/v1/logo/"
        data-api-endpoint-language-selector="{$AbsoluteBaseURL}api/v1/language_selector/"
        data-api-endpoint-translate-url-segment="{$AbsoluteBaseURL}api/v1/translate_url_segment/"
        data-api-endpoint-content="{$AbsoluteBaseURL}api/v1/content/">

        <% base_tag %>
        <meta charset="UTF-8">
        $MetaTags(false)
        <title>$Title - $SiteConfig.Title</title>
        <meta name="viewport"   content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="creator"    content="Janne Klouman <janne@klouman.com">
        <meta name="publisher"  content="Elliot Elliot <elliot@elliotelliot.com">
        <link rel="stylesheet"  href="/greger-elliot/front-end/dist/css/bundle.css">
    </head>
    <body>

		<% if $Form %>
			$Form
		<% else %>
        	<div id="greger-elliot-root"></div>
		<% end_if %>

        <script type="text/javascript" src="/greger-elliot/front-end/dist/javascript/bundle.js"></script>

    </body>
</html>
