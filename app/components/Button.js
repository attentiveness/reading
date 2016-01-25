'use strict';

import React from 'react-native';
const {
	Text,
	StyleSheet,
	PropTypes,
	TouchableOpacity,
} = React;
import StyleSheetPropType from 'StyleSheetPropType';
import ViewStylePropTypes from 'ViewStylePropTypes';
import TextStylePropTypes from 'TextStylePropTypes';

let ViewStylePropType = StyleSheetPropType(ViewStylePropTypes);
let TextStylePropType = StyleSheetPropType(TextStylePropTypes);

const propTypes = {
	onPress: PropTypes.func,
	disabled: PropTypes.bool,
	style: TextStylePropType,
	containerStyle: ViewStylePropType,
	text: PropTypes.string
}

class Button extends React.Component {
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
				<Text style={this.props.style}>
					{this.props.text}
				</Text>
			</TouchableOpacity>
		);
	}
}

Button.propTypes = propTypes;

Button.defaultProps = {
	onPress: function() {},
	disabled: false
}

export default Button;