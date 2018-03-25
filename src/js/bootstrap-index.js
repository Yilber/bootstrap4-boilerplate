import $ from 'jquery'
/**
 * ------------------------
 * Alerts for dismissing
 * ------------------------
 */
import Alert from '../../../node_modules/bootstrap/js/src/alert'

//Buttons for toggling states and checkbox/radio functionality
import Button from '../../../node_modules/bootstrap/js/src/button'

//Carousel for all slide behaviors, controls, and indicators
import Carousel from '../../../node_modules/bootstrap/js/src/carousel'

//Collapse for toggling visibility of content
import Collapse from '../../../node_modules/bootstrap/js/src/collapse'

//Dropdowns for displaying and positioning (also requires Popper.js)
import Dropdown from '../../../node_modules/bootstrap/js/src/dropdown'

//Modals for displaying, positioning, and scroll behavior
import Modal from '../../../node_modules/bootstrap/js/src/modal'
import Popover from '../../../node_modules/bootstrap/js/src/popover'

//Scrollspy for scroll behavior and navigation updates
import Scrollspy from '../../../node_modules/bootstrap/js/src/scrollspy'
import Tab from '../../../node_modules/bootstrap/js/src/tab'

//Tooltips and popovers for displaying and positioning (also requires Popper.js)
import Tooltip from '../../../node_modules/bootstrap/js/src/tooltip'
import Util from '../../../node_modules/bootstrap/js/src/util'

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

(($) => {
  if (typeof $ === 'undefined') {
    throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
  }

  const version = $.fn.jquery.split(' ')[0].split('.')
  const minMajor = 1
  const ltMajor = 2
  const minMinor = 9
  const minPatch = 1
  const maxMajor = 4

  if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
})($)

export {
  Util,
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Popover,
  Scrollspy,
  Tab,
  Tooltip
}
