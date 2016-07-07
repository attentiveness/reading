import React from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';

import ReadingToolbar from '../components/ReadingToolbar';
import AV from 'avoscloud-sdk';
import DeviceInfo from 'react-native-device-info';
import { toastShort } from '../utils/ToastUtils';

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
      toastShort('建议内容为空！');
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
          style={{ flex: 1, fontSize: 18, textAlignVertical: 'top' }}
          placeholder="请写下您宝贵的意见或建议，与Reading一起进步！"
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
