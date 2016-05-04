'use strict';

import React from 'react-native';
const {
	ProgressBarAndroid,
	ActivityIndicatorIOS,
	Platform,
	Text,
	StyleSheet,
	View
} = React;

class LoadingView extends React.Component {
	render() {
		if (Platform.OS === 'android') {
			return (
				<View style={styles.loading}>
        	<ProgressBarAndroid
        		styleAttr='LargeInverse'
        		color='#3e9ce9'
        	/>
          <Text style={ styles.loadingText }>数据加载中...</Text>
        </View>
			);
		} else {
			return (
				<View style={ styles.loading }>
        	<ActivityIndicatorIOS size='large' />
          <Text style={ styles.loadingText }>数据加载中...</Text>
        </View>
			);
		}
	}
}

let styles = StyleSheet.create({
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loadingText: {
		marginTop: 10,
		textAlign: 'center'
	}
});

export default LoadingView;