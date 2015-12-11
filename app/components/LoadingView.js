'use strict';

var React = require('react-native');
var {
  ProgressBarAndroid,
  ProgressViewIOS,
  Platform,
  Text,
  StyleSheet,
  View
} = React;

var LoadingView = React.createClass({
  render: function() {
    if (Platform.OS === 'android') {
      return (
        <View style={ styles.loading }>
              <ProgressBarAndroid styleAttr='LargeInverse' color='#3e9ce9' />
              <Text style={ styles.loadingText }>数据加载中...</Text>
            </View>
      );
    } else {
      return (
        <View style={ styles.loading }>
              <ProgressViewIOS progress={1}/>
              <Text style={ styles.loadingText }>数据加载中...</Text>
            </View>
      );
    }
  },
});

var styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
  }
});

module.exports = LoadingView;