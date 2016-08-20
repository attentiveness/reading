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
  TextInput,
  View
} from 'react-native';

import AV from 'leancloud-storage';
import DeviceInfo from 'react-native-device-info';
import ReadingToolbar from '../components/ReadingToolbar';
import { toastShort } from '../utils/ToastUtil';

const checkIco = require('../img/check.png');

let toolbarActions = [
  { title: '提交', icon: checkIco, show: 'always' }
];

let feedbackText;

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  componentDidMount() {
    feedbackText = '';
  }

  onActionSelected() {
    if (feedbackText === '') {
      toastShort('请填写建议内容哦~');
    } else {
      const { navigator } = this.props;
      const feedback = AV.Object.new('Feedback');
      feedback.set('manufacturer', DeviceInfo.getManufacturer());
      feedback.set('system', DeviceInfo.getSystemName());
      feedback.set('deviceVersion', DeviceInfo.getSystemVersion());
      feedback.set('deviceModel', DeviceInfo.getModel());
      feedback.set('appVersion', DeviceInfo.getVersion());
      feedback.set('feedback', feedbackText);
      feedback.save();
      navigator.pop();
      toastShort('您的问题已反馈，我们会及时跟进处理');
    }
  }

  render() {
    const { navigator } = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title="建议"
          actions={toolbarActions}
          onActionSelected={this.onActionSelected}
          navigator={navigator}
        />
        <TextInput
          style={{ flex: 1, fontSize: 18, padding: 15, textAlignVertical: 'top' }}
          placeholder="请写下您宝贵的意见或建议，与iReading一起进步！"
          placeholderTextColor="#aaaaaa"
          underlineColorAndroid="transparent"
          numberOfLines={200}
          multiline
          autoFocus
          onChangeText={(text) => {
            feedbackText = text;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc'
  }
});

export default Feedback;
