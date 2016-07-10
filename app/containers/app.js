import React from 'react';
import {
  StyleSheet,
  Navigator,
  StatusBar,
  BackAndroid,
  View
} from 'react-native';

import Splash from '../pages/Splash';
import { registerApp } from 'react-native-wechat';
import { naviGoBack } from '../utils/CommonUtil';

let tempNavigator;
let isRemoved = false;

class App extends React.Component {
  constructor(props) {
    super(props);
    registerApp('wxb24c445773822c79');
    this.renderScene = this.renderScene.bind(this);
    this.goBack = this.goBack.bind(this);
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  goBack() {
    return naviGoBack(tempNavigator);
  }

  configureScene() {
    return Navigator.SceneConfigs.PushFromRight;
  }

  renderScene(route, navigator) {
    let Component = route.component;
    tempNavigator = navigator;
    if (route.name === 'WebViewPage') {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
      isRemoved = true;
    } else {
      if (isRemoved) {
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
      }
    }
    return (
      <Component navigator={navigator} route={route} />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#3e9ce9"
          barStyle="default"
        />
        <Navigator
          ref="navigator"
          style={styles.navigator}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          initialRoute={{
            component: Splash,
            name: 'Splash'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});

export default App;
