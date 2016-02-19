import React from 'react-native';
const {
  StyleSheet,
  Image,
  Text,
  IntentAndroid,
  View
} = React;

import ReadingToolbar from '../components/ReadingToolbar';
import Button from '../components/Button';

let API_STORE = 'http://apistore.baidu.com/'
let READING_REPO = 'https://github.com/attentiveness/reading';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  onPress(url) {
    IntentAndroid.openURL(url);
  }

  render() {
    const {navigator} = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title="关于"
          navigator={navigator}
        />
        <View style={styles.content}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              style={{width: 110, height: 110, marginTop: 50}}
              source={require('../img/about_logo.png')}
            />
            <Text style={{fontSize: 16, textAlign: 'center', color: '#aaaaaa', marginTop: 5}}>
              v0.1.3
            </Text>
            <Text style={{fontSize: 28, textAlign: 'center', color: '#313131', marginTop: 10}}>
              Reading
            </Text>
            <Text style={{fontSize: 18, textAlign: 'center', color: '#4e4e4e'}}>
              让生活更精彩
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 14, textAlign: 'center', color: '#aaaaaa'}}>
                免责声明：所有内容均来自
              </Text>
              <Button
                style={{fontSize: 14, textAlign: 'center', color: '#3e9ce9'}}
                text={API_STORE}
                onPress={this.onPress.bind(this, API_STORE)}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 12, textAlign: 'center', color: '#aaaaaa'}}>
                @Reading Team：
              </Text>
              <Button
                style={{fontSize: 12, textAlign: 'center', color: '#3e9ce9'}}
                text={READING_REPO}
                onPress={this.onPress.bind(this, READING_REPO)}
              />
            </View>
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
    flex: 1,
    backgroundColor: '#fcfcfc',
    justifyContent: 'center',
    paddingBottom: 10
  }
})

export default About;