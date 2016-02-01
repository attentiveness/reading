import React from 'react-native';
const {
  StyleSheet,
  Image,
  Text,
  BackAndroid,
  View
} = React;

import ReadingToolbar from '../components/ReadingToolbar';
import {NaviGoBack} from '../utils/CommonUtils';

class About extends React.Component {
  constructor(props) {
    super(props);
    const {navigator} = this.props;
    BackAndroid.addEventListener('hardwareBackPress', function() {
      return NaviGoBack(navigator);
    });
  }

  render() {
    const {navigator} = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title={'关于Reading'}
          navigator={navigator}
        />
        <View style={{flex: 1, justifyContent: 'center', marginBottom: 10}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              style={{width: 110, height: 110, marginTop: 50}}
              source={require('../img/about_logo.png')}
            />
            <Text style={{fontSize: 16, textAlign: 'center', color: '#aaaaaa', marginTop: 5}}>
              v0.1.2
            </Text>
            <Text style={{fontSize: 28, textAlign: 'center', color: '#313131', marginTop: 10}}>
              Reading
            </Text>
            <Text style={{fontSize: 18, textAlign: 'center', color: '#4e4e4e'}}>
              让生活更精彩
            </Text>
          </View>
          <View >
            <Text style={{fontSize: 14, textAlign: 'center', color: '#aaaaaa'}}>
              免责声明：所有内容均来自http://apistore.baidu.com/
            </Text>
            <Text style={{fontSize: 12, textAlign: 'center', color: '#aaaaaa'}}>
              @Team：https://github.com/attentiveness/reading
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    backgroundColor: '#fcfcfc',

  }
})

export default About;