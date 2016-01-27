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

  render() {
  	const {navigator} = this.props;
  	return (
  		<View style={styles.container}>
        <ReadingToolbar
          actions={toolbarActions}
          onActionSelected={this.onActionSelected}
          title={navigator.getCurrentRoutes()[1].title}
          navigator={navigator}
        />
        <WebView
	        automaticallyAdjustContentInsets={false}
	        style={{flex: 1}}
	        url={navigator.getCurrentRoutes()[1].url}
	        javaScriptEnabled={true}
	        domStorageEnabled={true}
	        startInLoadingState={true}
	        scalesPageToFit={true}
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