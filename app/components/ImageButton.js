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
import PropTypes from 'prop-types';
import { ViewPropTypes, Image, TouchableOpacity } from 'react-native';

const propTypes = {
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  source: PropTypes.object,
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style
};

const ImageButton = ({
  onPress, disabled, source, style, containerStyle
}) => (
  <TouchableOpacity
    style={containerStyle}
    onPress={onPress}
    disabled={disabled}
  >
    <Image style={style} source={source} />
  </TouchableOpacity>
);

ImageButton.propTypes = propTypes;

ImageButton.defaultProps = {
  onPress() {},
  disabled: false
};

export default ImageButton;
