import React from 'react-native';
const {
  StyleSheet,
  Navigator,
  PropTypes
} = React;

import Splash from '../pages/Splash';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    let Component = route.component;
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
