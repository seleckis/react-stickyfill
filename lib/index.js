'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('Stickyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*global Stickyfill */


var Sticker = function (_Component) {
  _inherits(Sticker, _Component);

  function Sticker(props) {
    _classCallCheck(this, Sticker);

    var _this = _possibleConstructorReturn(this, (Sticker.__proto__ || Object.getPrototypeOf(Sticker)).call(this, props));

    _this.mediaMatch = function (media) {
      return window && window.matchMedia(media).matches;
    };

    _this.sticky = function (stick) {
      Stickyfill.add(stick);
      _this.setState({
        isSticky: true
      });
    };

    _this.unsticky = function (stick) {
      Stickyfill.remove(stick);
      _this.setState({
        isSticky: false
      });
    };

    _this.update = function () {
      Stickyfill.rebuild();
    };

    _this.handleResize = function () {
      if (_this.mediaMatch(_this.props.media)) {
        if (!_this.state.isSticky) {
          _this.sticky(_this.stick);
        }
      } else if (_this.state.isSticky) {
        _this.unsticky(_this.stick);
      }
    };

    _this.state = {
      isSticky: false
    };
    return _this;
  }

  _createClass(Sticker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.stick = _reactDom2.default.findDOMNode(this);
      if (this.props.media) {
        window && window.addEventListener('resize', this.handleResize);
        this.handleResize();
      } else {
        this.sticky(this.stick);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.props.media) {
        window && window.removeEventListener('resize', this.handleResize);
      }
      this.unsticky(this.stick);
      Stickyfill.pause();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.forceUpdate !== this.props.forceUpdate) {
        this.update();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          otherProps = _objectWithoutProperties(_props, ['children']);

      return typeof children.type === 'function' ? _react2.default.cloneElement(this.props.children, _extends({}, otherProps)) : children;
    }
  }]);

  return Sticker;
}(_react.Component);

Sticker.propTypes = {
  media: _propTypes2.default.string,
  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func])
};
exports.default = Sticker;