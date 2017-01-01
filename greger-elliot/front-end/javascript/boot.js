/**
 * Entry point for the website. Renders a single GregerApp component
 * which is responsible for the entire site.
 *
 * @author      Janne Klouman <janne@klouman.com>
 * @package     GregerElliotWebsite
 */

import React        from 'react';
import ReactDOM     from 'react-dom';
import GregerApp    from './GregerApp';

// Render GregerApp to the DOM.
ReactDOM.render(
    <GregerApp />,
    document.querySelector('#greger-elliot-root')
);
 