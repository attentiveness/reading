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

let toolbarActions = [
  {title: '提交', icon: require('../img/check.png'), show: 'always'}
];

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTypes());
  }

  onPress(type) {

  }

  onActionSelected() {

  }

  renderItem(item) {
    return (
      <Button
        key={item.id}
        containerStyle={{margin: 10, backgroundColor: '#fcfcfc', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#dddddd'}}
        style={{fontSize: 16, textAlign: 'center', color: 'black'}}
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
          actions={toolbarActions}
          navigator={navigator}
          onActionSelected={this.onActionSelected}
        />
        <View style={{padding: 10, backgroundColor: '#fcfcfc'}}>
          <Text style={{color: 'black', color: 18}}>
            选择您感兴趣的3-5个类别
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#f2f2f2'}}>
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