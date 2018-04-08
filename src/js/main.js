import $ from 'jquery';
import Plugin from './plugin';

(($) => {
    if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery.');
    }
})($);

export { Plugin };

