import React from 'react-native';
const {
  StyleSheet,
  Navigator,
  BackAndroid,
  PropTypes
} = React;

import MainContainer from './MainContainer';
import {NaviGoBack} from '../utils/CommonUtils';

var _navigator;

class App extends React.Component {
  constructor(props) {
    super(props);
    BackAndroid.addEventListener('hardwareBackPress', function() {
    	return NaviGoBack(_navigator);
    });
  }

  renderScene(route, navigator) {
    let Component = route.component;
    _navigator = navigator;
    return (
      <Component navigator={navigator} route={route} />
    );
  }

  configureScene(route) {
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
          component: MainContainer,
          name: 'Main'
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
