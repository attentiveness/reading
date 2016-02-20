import React from 'react-native';
const {
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} = React;

import LoadingView from '../components/LoadingView';
import ReadingToolbar from '../components/ReadingToolbar';
import {fetchTypes} from '../actions/category';
import Storage from '../utils/Storage';
import GridView from '../components/GridView';
import Button from '../components/Button';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTypes());
  }

  onPress(type) {

  }

  renderItem(item) {
    return (
      <Button
        key={item.id}
        containerStyle={{margin: 10}}
        style={{fontSize: 16, textAlign: 'center'}}
        text={item.name}
        onPress={this.onPress.bind(this, item)}>
      </Button>
    );
  }

  render() {
    const {navigator, category} = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title="分类"
          navigator={navigator}
        />
        <View style={{flex: 1, alignItems: 'center'}}>
          <GridView
            items={Array.from(category.typeList)}
            itemsPerRow={4}
            renderItem={this.renderItem}
          />
        </View>
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