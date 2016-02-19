import React from 'react-native';
const {
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  View
} = React;

import LoadingView from '../components/LoadingView';
import ReadingToolbar from '../components/ReadingToolbar';
import {fetchTypes} from '../actions/category';

var {height, width} = Dimensions.get('window');

class Category extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTypes());
  }

  render() {
    const {navigator, category} = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title="分类"
          navigator={navigator}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})

export default Category;