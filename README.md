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
import Sticker from 'Stickyfill';

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
