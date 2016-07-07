import React from 'react';
import {
  Dimensions,
  Image,
  InteractionManager
} from 'react-native';

import MainContainer from '../containers/MainContainer';

const { height, width } = Dimensions.get('window');

class Splash extends React.Component {
  componentDidMount() {
    const { navigator } = this.props;
    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo({
          component: MainContainer,
          name: 'Main'
        });
      });
    }, 2000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <Image
        style={{ width: width, height: height }}
        source={require('../img/splash.png')}
      />
    );
  }
}

export default Splash;
