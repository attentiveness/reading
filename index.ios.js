'use strict';

var React = require('react-native');
var App = require('./app/containers/app');

var {
  AppRegistry,
} = React;

AppRegistry.registerComponent('reading', () => App);