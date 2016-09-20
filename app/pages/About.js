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
  StyleSheet,
  Image,
  Text,
  Linking,
  View
} from 'react-native';

import DeviceInfo from 'react-native-device-info';
import ReadingToolbar from '../components/ReadingToolbar';
import Button from '../components/Button';

const API_STORE = 'http://apistore.baidu.com/';
const READING_REPO = 'https://github.com/attentiveness/reading';

const aboutLogo = require('../img/about_logo.png');

class About extends React.Component {
  onPress(url) {
    Linking.openURL(url);
  }

  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title="关于"
          navigator={navigator}
        />
        <View style={styles.content}>
          <View style={styles.center}>
            <Image
              style={styles.logo}
              source={aboutLogo}
            />
            <Text style={styles.version}>
              {`v${DeviceInfo.getVersion()}`}
            </Text>
            <Text style={styles.title}>
              iReading
            </Text>
            <Text style={styles.subtitle}>
              让生活更精彩
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.disclaimerContent}>
              <Text style={[styles.disclaimer, { color: '#999999' }]}>
                免责声明：所有内容均来自——
              </Text>
              <Button
                style={[styles.disclaimer, { color: '#3e9ce9' }]}
                text={API_STORE}
                onPress={() => this.onPress(API_STORE)}
              />
            </View>
            <View style={styles.sourceContent}>
              <Text style={[styles.source, { color: '#aaaaaa' }]}>
                @Github：
              </Text>
              <Button
                style={[styles.source, { color: '#3e9ce9' }]}
                text={READING_REPO}
                onPress={() => this.onPress(READING_REPO)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    justifyContent: 'center',
    paddingBottom: 10
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 50
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 5
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e'
  },
  disclaimerContent: {
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center'
  },
  sourceContent: {
    flexDirection: 'row',
    marginTop: 8
  },
  source: {
    fontSize: 12,
    textAlign: 'center'
  },
  bottomContainer: {
    alignItems: 'center'
  }
});

export default About;
