'use strict';

import React, {PropTypes} from 'react';
import {
	Text,
	TouchableOpacity
} from 'react-native';

const propTypes = {
	onPress: PropTypes.func,
	disabled: PropTypes.bool,
	style: PropTypes.object,
	containerStyle: PropTypes.object,
	text: PropTypes.string
};

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
};

export default Button;