'use strict';

import React from 'react-native';
const {
  StyleSheet,
  PropTypes,
  WebView,
  View
} = React;

import ReadingToolbar from '../components/ReadingToolbar';
import {ToastShort} from '../utils/ToastUtils';
import LoadingView from '../components/LoadingView';
import {getApiVersion} from 'react-native-wechat';

let toolbarActions = [
  {title: '分享', show: 'always'}
]

class WebViewPage extends React.Component {
	constructor(props) {
    super(props);
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  onActionSelected() {
  	ToastShort('分享！');
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
	        automaticallyAdjustContentInsets={false}
	        style={{flex: 1}}
	        url={route.url}
	        javaScriptEnabledAndroid={true}
	        domStorageEnabledAndroid={true}
	        startInLoadingState={true}
	        scalesPageToFit={true}
          onShouldStartLoadWithRequest={true}
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