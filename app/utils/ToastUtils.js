'use strict';

import React from 'react-native';
const {
	ToastAndroid
} = React;

export function ToastShort(content) {
	ToastAndroid.show(new String(content), ToastAndroid.SHORT);
}

export function ToastLong(content) {
	ToastAndroid.show(new String(content), ToastAndroid.LONG);
}