"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

require("Stickyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /*global Stickyfill */


var Sticker = _react2.default.createClass({
	displayName: "Sticker",

	propTypes: {
		media: _react2.default.PropTypes.string
	},
	mediaMatch: function mediaMatch(media) {
		return window.matchMedia(media).matches;
	},
	getInitialState: function getInitialState() {
		return {
			isSticky: false
		};
	},
	sticky: function sticky(stick) {
		Stickyfill.add(stick);
		this.setState({
			isSticky: true
		});
	},
	unsticky: function unsticky(stick) {
		Stickyfill.remove(stick);
		this.setState({
			isSticky: false
		});
	},
	update: function update() {
		Stickyfill.rebuild();
	},
	handleResize: function handleResize() {
		if (this.mediaMatch(this.props.media)) {
			if (!this.state.isSticky) {
				this.sticky(this.stick);
			}
		} else if (this.state.isSticky) {
			this.unsticky(this.stick);
		}
	},
	componentDidMount: function componentDidMount() {
		this.stick = _reactDom2.default.findDOMNode(this);
		if (this.props.media) {
			window.addEventListener('resize', this.handleResize);
			this.handleResize();
		} else {
			this.sticky(this.stick);
		}
	},
	componentWillUnmount: function componentWillUnmount() {
		if (this.props.media) {
			window.removeEventListener('resize', this.handleResize);
		}
		this.unsticky(this.stick);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.forceUpdate !== this.props.forceUpdate) {
			this.update();
		}
	},
	componentDidUpdate: function componentDidUpdate() {
		this.update();
	},
	render: function render() {
		return _react2.default.cloneElement.apply(_react2.default, [this.props.children].concat(_toConsumableArray(this.props)));
	}
});

exports.default = Sticker;
module.exports = exports["default"];