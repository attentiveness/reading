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
import React, { PropTypes } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';

const propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  source: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    // Opaque type returned by require('./image.jpg')
    PropTypes.number,
  ]),
  style: View.propTypes.style,
  containerStyle: View.propTypes.style
};

class ImageButton extends React.Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    if (this.props.disabled) {
      return;
    }
    this.props.onPress();
  }

  render() {
    return (
      <TouchableOpacity
        style={this.props.containerStyle}
        onPress={this.onPress}
      >
        <Image
          style={this.props.style}
          source={this.props.source}
        />
      </TouchableOpacity>
    );
  }
}

ImageButton.propTypes = propTypes;

ImageButton.defaultProps = {
  onPress() {},
  disabled: false
};

export default ImageButton;
