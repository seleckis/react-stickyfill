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
			isSticky: false,
			updated: false
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
		{
			Stickyfill.rebuild();
			this.setState({
				updated: true
			});
		}
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
	render: function render() {
		return this.props.children;
	}
}); /*global Stickyfill */
exports.default = Sticker;
module.exports = exports["default"];