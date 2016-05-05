'use strict';

import React from 'react';
import {
	Image,
	PropTypes,
	TouchableOpacity
} from 'react-native';
import StyleSheetPropType from 'StyleSheetPropType';
import ViewStylePropTypes from 'ViewStylePropTypes';

let stylePropType = StyleSheetPropType(ViewStylePropTypes);

const propTypes = {
	onPress: PropTypes.func,
	disabled: PropTypes.bool,
	source: PropTypes.oneOfType([
		PropTypes.shape({
			uri: PropTypes.string,
		}),
		// Opaque type returned by require('./image.jpg')
		PropTypes.number,
	]),
	style: stylePropType,
	containerStyle: stylePropType
};

class ImageButton extends React.Component {
	constructor(props) {
		super(props);

		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		if (this.props.disabled) {
			return;
		}
		this.props.onPress();
	}

	render() {
		return (
			<TouchableOpacity
				style={this.props.containerStyle}
				onPress={this.onPress}>
				<Image
				  style={this.props.style}
				  source={this.props.source}
				/>
			</TouchableOpacity>
		);
	}
}

ImageButton.propTypes = propTypes;

ImageButton.defaultProps = {
	onPress: function() {},
	disabled: false
};

export default ImageButton;