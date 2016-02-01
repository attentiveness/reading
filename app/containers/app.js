import React from 'react-native';
const {
  StyleSheet,
  Navigator,
  BackAndroid,
  PropTypes
} = React;

import Splash from '../pages/Splash';
import {registerApp} from 'react-native-wechat';
import {NaviGoBack} from '../utils/CommonUtils';

var _navigator, isRemoved = false;

class App extends React.Component {
  constructor(props) {
    super(props);
    registerApp('wxb24c445773822c79');
    this.renderScene = this.renderScene.bind(this);
    this.goBack = this.goBack.bind(this);
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  goBack() {
    return NaviGoBack(_navigator);
  }

  renderScene(route, navigator) {
    let Component = route.component;
    _navigator = navigator;
    if (route.name === 'WebViewPage') {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
      isRemoved = true;
    } else {
      if (isRemoved) {
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
      };
    }
    return (
      <Component navigator={navigator} route={route} />
    );
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        style={styles.navigator}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        initialRoute={{
          component: Splash,
          name: 'Splash'
        }}
      />
    );
  }
}

let styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

export default App;
