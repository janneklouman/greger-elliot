<!DOCTYPE html>
<html lang="$ContentLocale" data-title-base="$SiteConfig.Title">
    <head
        data-api-base="{$AbsoluteBaseURL}api/v1/"
        data-api-endpoint-menu="{$AbsoluteBaseURL}api/v1/menu/"
        data-api-endpoint-language-selector="{$AbsoluteBaseURL}api/v1/language_selector/"
        data-api-endpoint-content="{$AbsoluteBaseURL}api/v1/content/">

        <% base_tag %>
        <meta charset="UTF-8">
        $MetaTags(false)
        <title>$Title - $SiteConfig.Title</title>
        <meta name="viewport"   content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="creator"    content="Janne Klouman <janne@klouman.com">
        <meta name="publisher"  content="Elliot Elliot <elliot@elliotelliot.com">

    </head>
    <body>

        $Form
        <div id="greger-elliot"></div>
        <script type="text/javascript" src="/greger-elliot/front-end/dist/javascript/bundle.js"></script>

    </body>
</html>