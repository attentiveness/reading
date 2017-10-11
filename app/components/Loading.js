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
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Modal,
  ActivityIndicator
} from 'react-native';

const SIZES = ['small', 'large'];

const propTypes = {
  visible: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  overlayColor: PropTypes.string,
  onRequestClose: PropTypes.func
};

const Loading = ({
  visible, color, size, overlayColor, onRequestClose
}) => (
  <Modal visible={visible} transparent onRequestClose={onRequestClose}>
    {visible ? (
      <View key="spinner" style={styles.container}>
        <View style={[styles.background, { backgroundColor: overlayColor }]}>
          <View style={styles.loading}>
            <ActivityIndicator size={size} color={color} />
            <Text style={styles.loadingText}>数据加载中...</Text>
          </View>
        </View>
      </View>
    ) : (
      <View key="spinner" />
    )}
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#fcfcfc'
  }
});

Loading.propTypes = propTypes;

Loading.defaultProps = {
  visible: false,
  color: 'white',
  size: 'large',
  overlayColor: 'transparent',
  onRequestClose() {}
};

export default Loading;
