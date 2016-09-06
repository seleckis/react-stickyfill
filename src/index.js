/*global Stickyfill */
import React from "react";
import ReactDOM from "react-dom";
import 'Stickyfill';

const Sticker = React.createClass({
	propTypes: {
	    media: React.PropTypes.string
	},
	mediaMatch(media){
		return window.matchMedia(media).matches;
	},
	getInitialState(){
		return {
			isSticky: false
		}
	},
	sticky(stick){
		Stickyfill.add(stick);
		this.setState({
			isSticky: true
		});
	},
	unsticky(stick){
		Stickyfill.remove(stick);
		this.setState({
			isSticky: false
		});
	},
	update(){{
		Stickyfill.rebuild();
	}},
	handleResize() {
		if(this.mediaMatch(this.props.media)){
			if(!this.state.isSticky){
				this.sticky(this.stick);
			}
		} else if(this.state.isSticky){
			this.unsticky(this.stick);
		}
	},
	componentDidMount(){
		this.stick = ReactDOM.findDOMNode(this);
		if(this.props.media){
			window.addEventListener('resize', this.handleResize);
			this.handleResize();
		} else {
			this.sticky(this.stick);
		}
	},
	componentWillUnmount() {
		if(this.props.media){
			window.removeEventListener('resize', this.handleResize);
		}
		this.unsticky(this.stick);
	},
	componentWillReceiveProps(nextProps){
		if(nextProps.forceUpdate !== this.props.forceUpdate){
			this.update();
		}
	},
	render(){
		return this.props.children;
	}
});



export default Sticker;
