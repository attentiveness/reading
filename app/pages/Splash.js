'use strict';

import React from 'react';
import {
  Dimensions,
  Image,
  InteractionManager
} from 'react-native';

import MainContainer from '../containers/MainContainer';

var {height, width} = Dimensions.get('window');

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {navigator} = this.props;
    setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo({
          component: MainContainer,
          name: 'Main'
        });
      });
    }, 2000);
  }

  render() {
    return (
      <Image
        style={{flex: 1, width: width, height: height}}
        source={require('../img/splash.png')}
      />
    );
  }
}

export default Splash;