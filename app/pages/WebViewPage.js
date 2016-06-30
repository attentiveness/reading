'use strict';

import React from 'react';
import {
  StyleSheet,
  WebView,
  BackAndroid,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal
} from 'react-native';

import ReadingToolbar from '../components/ReadingToolbar';
import {ToastShort} from '../utils/ToastUtils';
import LoadingView from '../components/LoadingView';
import {NaviGoBack} from '../utils/CommonUtils';
import * as WeChat from 'react-native-wechat';

let toolbarActions = [
  {title: '分享', icon: require('../img/share.png'), show: 'always'}
];
var canGoBack = false;

class WebViewPage extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      isShareModal: false
    };
    this.onActionSelected = this.onActionSelected.bind(this);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
  }

  onActionSelected() {
    this.setState({
      isShareModal: true
    });
  }

  onNavigationStateChange(navState) {
    canGoBack = navState.canGoBack;
  }

  goBack() {
    if (this.state.isShareModal) {
      this.setState({
        isShareModal: false
      });
      return true;
    } else if (canGoBack) {
      this.refs.webview.goBack();
      return true;
    }
    return NaviGoBack(this.props.navigator);
  }

  renderLoading() {
    return <LoadingView />;
  }

  renderSpinner() {
    const {route} = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => {
        this.setState({
          isShareModal: false
        });
      }}>
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
                  WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                      if (isInstalled) {
                        WeChat.shareToSession({
                          title: route.article.title,
                          description: '分享自：Reading',
                          thumbImage: route.article.contentImg,
                          type: 'news',
                          webpageUrl: route.article.url
                        })
                        .catch((error) => {
                          ToastShort(error.message);
                        });
                      } else {
                        ToastShort('没有安装微信软件，请您安装微信之后再试');
                      }
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
                  WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                      if (isInstalled) {
                        WeChat.shareToTimeline({
                          title: '[@Reading]' + route.article.title,
                          thumbImage: route.article.contentImg,
                          type: 'news',
                          webpageUrl: route.article.url
                        })
                        .catch((error) => {
                          ToastShort(error.message);
                        });
                      } else {
                        ToastShort('没有安装微信软件，请您安装微信之后再试');
                      }
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
      </TouchableWithoutFeedback>
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
        <Modal
          animationType='fade'
          visible={this.state.isShareModal}
          transparent={true}
          onRequestClose={() => {this.setState({
            isShareModal: false
          });}}
        >
          {this.renderSpinner()}
        </Modal>
        <WebView
          ref='webview'
	        automaticallyAdjustContentInsets={false}
	        style={{flex: 1}}
          source={{uri: route.article.url}}
	        javaScriptEnabled={true}
	        domStorageEnabled={true}
	        startInLoadingState={true}
	        scalesPageToFit={true}
          decelerationRate="normal"
          onShouldStartLoadWithRequest={(event) => {
            return true;
          }}
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
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)'
  },
  spinnerContent: {
    justifyContent: 'center',
    width: Dimensions.get('window').width * (7 / 10),
    height: Dimensions.get('window').width * (7 / 10) * 0.68,
    backgroundColor: '#fcfcfc',
    padding: 20,
    borderRadius: 5
  },
  spinnerTitle: {
    fontSize: 18,
    color: '#313131',
    textAlign: 'center',
    marginTop: 5
  },
  shareContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shareIcon: {
    width: 40,
    height: 40
  }
});

export default WebViewPage;