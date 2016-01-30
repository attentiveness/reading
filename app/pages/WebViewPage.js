'use strict';

import React from 'react-native';
const {
  StyleSheet,
  PropTypes,
  WebView,
  BackAndroid,
  View
} = React;

import ReadingToolbar from '../components/ReadingToolbar';
import {ToastShort} from '../utils/ToastUtils';
import LoadingView from '../components/LoadingView';
import {NaviGoBack} from '../utils/CommonUtils';
import {getApiVersion} from 'react-native-wechat';

let toolbarActions = [
  {title: '分享', show: 'always'}
];
var canGoBack = false;
let webviewRef;

class WebViewPage extends React.Component {
	constructor(props) {
    super(props);
    this.onActionSelected = this.onActionSelected.bind(this);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  componentDidMount() {
    const {navigator} = this.props;
    webviewRef = this.refs.webview;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if (canGoBack) {
        webviewRef.goBack();
        return true;
      }
      return NaviGoBack(navigator);
    });
  }

  onActionSelected() {
  	ToastShort('敬请期待');
  }

  onNavigationStateChange(navState) {
    canGoBack = navState.canGoBack;
  }

  renderLoading() {
    return <LoadingView />;
  }

  render() {
  	const {navigator, route} = this.props;
  	return (
  		<View style={styles.container}>
        <ReadingToolbar
          actions={toolbarActions}
          onActionSelected={this.onActionSelected}
          title={route.title}
          navigator={navigator}
        />
        <WebView
          ref='webview'
	        automaticallyAdjustContentInsets={false}
	        style={{flex: 1}}
	        url={route.url}
	        javaScriptEnabledAndroid={true}
	        domStorageEnabledAndroid={true}
	        startInLoadingState={true}
	        scalesPageToFit={true}
          onShouldStartLoadWithRequest={true}
          onNavigationStateChange={this.onNavigationStateChange}
          renderLoading={this.renderLoading.bind(this)}
	      />
      </View>
  	);
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})

export default WebViewPage;