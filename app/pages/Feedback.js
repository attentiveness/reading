import React from 'react-native';
const {
  StyleSheet,
  TextInput,
  View
} = React;

import ReadingToolbar from '../components/ReadingToolbar';
import AV from 'avoscloud-sdk';
import {ToastShort} from '../utils/ToastUtils';

let toolbarActions = [
  {title: '提交', icon: require('../img/check.png'), show: 'always'}
];

var feedbackText;

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
      ToastShort('建议内容为空！')
    } else {
      const {navigator} = this.props;
      var feedback = AV.Object.new('Feedback');
      feedback.set('feedback', feedbackText);
      feedback.save();
      navigator.pop();
      ToastShort('您的问题已反馈，我们会及时跟进处理');
    }
  }

  render() {
    const {navigator} = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title={'建议'}
          actions={toolbarActions}
          onActionSelected={this.onActionSelected}
          navigator={navigator}
        />
        <TextInput
          style={{flex: 1, fontSize: 18, textAlignVertical: 'top'}}
          placeholder="请写下您宝贵的意见或建议，与Reading一起进步！"
          placeholderTextColor="#aaaaaa"
          underlineColorAndroid="transparent"
          numberOfLines={200}
          multiline={true}
          autoFocus={true}
          onChangeText={(text) => {feedbackText = text}}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc'
  }
})

export default Feedback;