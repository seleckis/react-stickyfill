"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

require("Stickyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /*global Stickyfill */


var Sticker = _react2.default.createClass({
	displayName: "Sticker",

	propTypes: {
		media: _react2.default.PropTypes.string,
		children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.func])
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
		var _props = this.props;
		var children = _props.children;

		var otherProps = _objectWithoutProperties(_props, ["children"]);

		return typeof children.type === "function" ? _react2.default.cloneElement(this.props.children, _extends({}, otherProps)) : children;
	}
});

exports.default = Sticker;
module.exports = exports["default"];