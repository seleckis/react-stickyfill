⚠ Unmaintained!
react-stickyfill did a good job while the browsers were implementing position: sticky support. You can now safely use stickies without a polyfill, all modern browsers support them natively.

# react-stickyfill
React wrapper for [Stickyfill](https://github.com/wilddeer/stickyfill) library

## Installation

```
npm install react-stickyfill --save
```

## Usage

Simple usage:

```js
import React, {Component} from 'react';
import Sticker from 'react-stickyfill';

class SomeComponent extend Component{
	render() {
		return (
			<div>{/* Parent Element. */}
				<Sticker>
					<div>{/* Sticky Element */}</div>
				</Sticker>
			</div>
		);
	}
}
```

*Parent Element* should have height greater than *Sticky Element*. *Sticky Element* should have style `position: sticky` and `top: {some value}`.
