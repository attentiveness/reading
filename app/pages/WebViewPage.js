'use strict';

import React from 'react-native';
const {
  StyleSheet,
  PropTypes,
  WebView,
  BackAndroid,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  View
} = React;

import ReadingToolbar from '../components/ReadingToolbar';
import {ToastShort} from '../utils/ToastUtils';
import LoadingView from '../components/LoadingView';
import {NaviGoBack} from '../utils/CommonUtils';
import {shareToTimeline, shareToSession} from 'react-native-wechat';
import Portal from 'react-native/Libraries/Portal/Portal.js';

let tag;
let toolbarActions = [
  {title: '分享', icon: require('../img/share.png'), show: 'always'}
];
var canGoBack = false;
let webviewRef;

class WebViewPage extends React.Component {
	constructor(props) {
    super(props);
    this.onActionSelected = this.onActionSelected.bind(this);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      tag = Portal.allocateTag();
    }
  }

  componentDidMount() {
    const {navigator} = this.props;
    webviewRef = this.refs.webview;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      if (Portal.getOpenModals().length != 0) {
        Portal.closeModal(tag);
        return true;
      } else if (canGoBack) {
        webviewRef.goBack();
        return true;
      }
      return NaviGoBack(navigator);
    });
  }

  onActionSelected() {
    Portal.showModal(tag, this.renderSpinner());
  }

  onNavigationStateChange(navState) {
    canGoBack = navState.canGoBack;
  }

  renderLoading() {
    return <LoadingView />;
  }

  renderSpinner() {
    const {route} = this.props;
    return (
      <View
        key={'spinner'}
        style={styles.spinner}
      >
        <View style={styles.spinnerContent}>
          <Text style={[styles.spinnerTitle, {fontSize: 20, color: 'black'}]}>
            分享到
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                shareToSession({
                  title: 'Reading',
                  description: route.article.title,
                  thumbImage: route.article.contentImg,
                  type: 'news',
                  webpageUrl: route.article.url
                })
                .catch((error) => {
                  ToastShort(error.message);
                });
            }}>
              <View style={styles.shareContent}>
                <Image
                  style={styles.shareIcon}
                  source={require('../img/share_icon_wechat.png')}
                />
                <Text style={styles.spinnerTitle}>
                  微信
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                shareToTimeline({
                  title: '[Reading]' + route.article.title,
                  thumbImage: route.article.contentImg,
                  type: 'news',
                  webpageUrl: route.article.url
                })
                .catch((error) => {
                  ToastShort(error.message);
                });
            }}>
              <View style={styles.shareContent}>
                <Image
                  style={styles.shareIcon}
                  source={require('../img/share_icon_moments.png')}
                />
                <Text style={styles.spinnerTitle}>
                  朋友圈
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
  	const {navigator, route} = this.props;
  	return (
  		<View style={styles.container}>
        <ReadingToolbar
          actions={toolbarActions}
          onActionSelected={this.onActionSelected}
          title={route.article.userName}
          navigator={navigator}
        />
        <WebView
          ref='webview'
	        automaticallyAdjustContentInsets={false}
	        style={{flex: 1}}
	        url={route.article.url}
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
  },
  spinner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerContent: {
    width: 200,
    height: 150,
    backgroundColor: '#fcfcfc',
    padding: 20,
    borderBottomColor: '#ddd',
    borderLeftColor: '#ddd',
    borderRightColor: '#ddd',
    borderTopColor: '#ddd',
    borderWidth: 2
  },
  spinnerTitle: {
    fontSize: 18,
    color: '#313131',
    textAlign: 'center'
  },
  shareContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareIcon: {
    width: 40,
    height: 40
  }
})

export default WebViewPage;