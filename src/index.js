/*global Stickyfill */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import 'Stickyfill';

export default class Sticker extends Component {
  static propTypes = {
    media: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  };
  constructor(props) {
    super(props);
    this.state = {
      isSticky: false,
    };
  }
  mediaMatch = media => {
    return window && window.matchMedia(media).matches;
  };
  sticky = stick => {
    Stickyfill.add(stick);
    this.setState({
      isSticky: true,
    });
  };
  unsticky = stick => {
    Stickyfill.remove(stick);
    this.setState({
      isSticky: false,
    });
  };
  update = () => {
    Stickyfill.rebuild();
  };
  handleResize = () => {
    if (this.mediaMatch(this.props.media)) {
      if (!this.state.isSticky) {
        this.sticky(this.stick);
      }
    } else if (this.state.isSticky) {
      this.unsticky(this.stick);
    }
  };
  componentDidMount() {
    this.stick = ReactDOM.findDOMNode(this);
    if (this.props.media) {
      window && window.addEventListener('resize', this.handleResize);
      this.handleResize();
    } else {
      this.sticky(this.stick);
    }
  }
  componentWillUnmount() {
    if (this.props.media) {
      window && window.removeEventListener('resize', this.handleResize);
    }
    this.unsticky(this.stick);
    Stickyfill.pause();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.forceUpdate !== this.props.forceUpdate) {
      this.update();
    }
  }
  componentDidUpdate() {
    this.update();
  }
  render() {
    let { children, ...otherProps } = this.props;
    return typeof children.type === 'function' ? React.cloneElement(this.props.children, { ...otherProps }) : children;
  }
}
