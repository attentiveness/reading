'use strict';

import React from 'react-native';
const {
	ToastAndroid,
	Alert,
	Platform
} = React;

export function ToastShort(content) {
	if (Platform.OS === 'android') {
		ToastAndroid.show(new String(content), ToastAndroid.SHORT);
	} else {
		Alert.alert(
		  '提示',
		  content.toString()
		)
	}
}

export function ToastLong(content) {
	if (Platform.OS === 'android') {
		ToastAndroid.show(new String(content), ToastAndroid.LONG);
	} else {
		Alert.alert(
		  '提示',
		  content.toString()
		)
	}
}