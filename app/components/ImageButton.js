'use strict';

import React from 'react-native';
const {
	Image,
	StyleSheet,
	PropTypes,
	TouchableOpacity,
} = React;
import StyleSheetPropType from 'StyleSheetPropType';
import ViewStylePropTypes from 'ViewStylePropTypes';

let stylePropType = StyleSheetPropType(ViewStylePropTypes);

const propTypes = {
	onPress: PropTypes.func,
	disabled: PropTypes.bool,
	uri: PropTypes.string,
	require: PropTypes.number,
	isStatic: PropTypes.bool,
	isUri: PropTypes.bool,
	style: stylePropType,
	containerStyle: stylePropType
}

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
		var source = this.props.isUri ? {
			uri: this.props.uri,
			isStatic: this.props.isStatic
		} : this.props.require;
		return (
			<TouchableOpacity
				style={this.props.containerStyle}
				onPress={this.onPress}>
				<Image
				  style={this.props.style}
				  source={source}
				/>
			</TouchableOpacity>
		);
	}
}

ImageButton.propTypes = propTypes;

ImageButton.defaultProps = {
	onPress: function() {},
	disabled: false,
	isStatic: false,
	uri: '',
	isUri: true
}

export default ImageButton;