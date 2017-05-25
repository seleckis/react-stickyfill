import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Sticker from '../../lib/';

class Comp extends Component {
	render() {
		return (
			<div className={this.props.className}>Sticky Component </div>
		)
	}
}

class App extends Component {
	static defaultProps = {
		media: "(max-width: 767px) and (orientation: portrait), (max-width: 1023px) and (orientation: landscape)"
	};
	constructor(props) {
		super(props);
		this.state = {
			stickerActive: false,
			height: false
		};
	}
	componentDidMount() {
		window.addEventListener('resize', this.changeState);
		this.changeState();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.changeState);
	}
	mediaMatch = (media) => {
		return window.matchMedia(media).matches;
	}
	changeState = () => {
		this.setState({
			stickerActive: this.mediaMatch(this.props.media),
			height: this.child2.offsetHeight
		});
	}
	render() {
		return (
			<div className="root">
				<div className="section before">
					<h2>Scroll down</h2>
				</div>
				<div className="section parent cf">
					<Sticker>
						<div className="child">
							<h2>Sticky box</h2>
						</div>
					</Sticker>
				</div>
				<div className="section parent2 cf">
					<Sticker media={this.props.media} forceUpdate={this.state.height}>
						<div className={ !this.state.stickerActive ? "child2" : "child2-active" } ref={(r) => this.child2 = r}>
							<h2>Sticky box with media</h2>
							<p className="note">
								works only on <span className="media">{this.props.media}</span>
								because of media prop passed to Sticker component
							</p>
						</div>
					</Sticker>
				</div>
				<div className="section parent3 cf">
					<Sticker className="child3">
						<Comp />
					</Sticker>
				</div>
				<div className="section after">
					<h2>Scroll back</h2>
				</div>
			</div>
		);
	}
}

if(typeof document !== 'undefined') {
	ReactDOM.render(
		(
			<App />
		),
		document.getElementById('app')
	);
}
