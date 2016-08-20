/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import {
  Dimensions,
  Animated
} from 'react-native';

import MainContainer from '../containers/MainContainer';
import CategoryContainer from '../containers/CategoryContainer';
import Storage from '../utils/Storage';

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;
const splashImg = require('../img/splash.png');

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(1)
    };
  }

  componentDidMount() {
    Animated.timing(
      this.state.bounceValue, { toValue: 1.2, duration: 1000 }
    ).start();
    this.timer = setTimeout(() => {
      const { navigator } = this.props;
      Storage.get('isInit')
      .then((isInit) => {
        if (!isInit) {
          navigator.resetTo({
            component: CategoryContainer,
            name: 'Category',
            isFirst: true
          });
          Storage.save('isInit', true);
        } else {
          navigator.resetTo({
            component: MainContainer,
            name: 'Main'
          });
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Animated.Image
        style={{ width: maxWidth, height: maxHeight,
            transform: [{ scale: this.state.bounceValue }] }}
        source={splashImg}
      />
    );
  }
}

export default Splash;
