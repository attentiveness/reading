'use strict';

import React, {PropTypes} from 'react';
import {
	StyleSheet,
	ToolbarAndroid,
	Platform,
	View,
	Text
} from 'react-native';

import {NaviGoBack} from '../utils/CommonUtils';
import ImageButton from './ImageButton';
import Button from './Button';

let showActionButton = false;

const propTypes = {
	title: PropTypes.string,
	actions: PropTypes.array,
	navigator: PropTypes.object,
	onActionSelected: PropTypes.func,
	onIconClicked: PropTypes.func,
	navIcon: PropTypes.number
};

class ReadingToolbar extends React.Component {
	constructor(props) {
		super(props);
		this.onIconClicked = this.onIconClicked.bind(this);
		this.onActionSelected = this.onActionSelected.bind(this);
	}

	onIconClicked() {
		if (this.props.onIconClicked) {
			this.props.onIconClicked();
		} else {
			const {navigator} = this.props;
			if (navigator) {
				NaviGoBack(navigator);
			}
		}
	}
	onActionSelected(position) {
		this.props.onActionSelected();
	}

	renderToolbarAndroid() {
		return (
			<ToolbarAndroid
				style={styles.toolbar}
				actions={this.props.actions}
	      onActionSelected={this.onActionSelected}
	      onIconClicked={this.onIconClicked}
	      navIcon={this.props.navIcon ? this.props.navIcon : require('../img/icon_left.png')}
	      titleColor='#fff'
	      title={this.props.title}
	    />
		);
	}

	renderToolbarIOS() {
		let action = this.props.actions[0];
		showActionButton = action !== undefined;
		return (
			<View style={styles.toolbar}>
				<ImageButton
					containerStyle={{justifyContent: 'center', alignItems: 'center'}}
					source={this.props.navIcon ? this.props.navIcon : require('../img/icon_left_ios.png')}
					style={styles.leftIOS}
					onPress={this.onIconClicked}
				/>
				<Text style={[styles.titleIOS, showActionButton ? {paddingLeft: 0} : {paddingLeft: -35}]}>{this.props.title}</Text>
				{showActionButton && action['show'] === 'always' ?
					<ImageButton
						containerStyle={showActionButton ? styles.rightIOS : {height: 0, width: 0}}
						source={action['icon']}
						onPress={this.onActionSelected}
					/> :
					<Button
						containerStyle={showActionButton ? styles.rightIOS : {height: 0, width: 0}}
						style={styles.rightText}
						text={showActionButton ? action['title'] : ''}
						onPress={this.onActionSelected}
					/>
				}
			</View>
		);
	}

	render() {
		let Toolbar = Platform.select({
			android: () => this.renderToolbarAndroid(),
			ios: () => this.renderToolbarIOS()
		});
		return <Toolbar />;
	}
}

let styles = StyleSheet.create({
	toolbar: {
		flexDirection: 'row',
    backgroundColor: '#3e9ce9',
    height: 58
  },
  titleIOS: {
  	flex: 1,
  	textAlign: 'center',
  	color: '#fff',
  	fontWeight: 'bold',
  	fontSize: 20,
  	marginTop: 25
  },
  leftIOS: {
  	height: 15,
  	width: 25,
  	marginTop: 20,
  	marginLeft: 10
  },
  rightIOS: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	marginTop: 20,
		marginRight: 10
  },
  rightText: {
  	textAlign: 'center',
  	color: '#fff',
  	fontSize: 18
  }
});

ReadingToolbar.propTypes = propTypes;

ReadingToolbar.defaultProps = {
	onActionSelected: function() {},
	title: '',
	actions: []
};

export default ReadingToolbar;