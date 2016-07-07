import React, { PropTypes } from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ReadingToolbar from '../components/ReadingToolbar';
import { fetchTypes } from '../actions/category';
import Storage from '../utils/Storage';
import GridView from '../components/GridView';
import Button from '../components/Button';
import { toastShort } from '../utils/ToastUtils';
import MainContainer from '../containers/MainContainer';
import { CATEGORIES } from '../constants/Alias';

const checkIno = require('../img/check.png');
let toolbarActions = [
  { title: '提交', icon: checkIno, show: 'always' }
];
let tempTypeIds = [];

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.onActionSelected = this.onActionSelected.bind(this);
    this.resetRoute = this.resetRoute.bind(this);
    this.state = {
      typeIds: tempTypeIds
    };
  }

  componentWillMount() {
    Storage.get('typeIds')
      .then((typeIds) => {
        tempTypeIds = typeIds;
        this.setState({
          typeIds
        });
      });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTypes());
  }

  onPress(type) {
    const pos = tempTypeIds.indexOf(parseInt(type.id));
    if (pos === -1) {
      tempTypeIds.push(parseInt(type.id));
    } else {
      tempTypeIds.splice(pos, 1);
    }
    this.setState({
      typeIds: tempTypeIds
    });
  }

  onActionSelected() {
    if (tempTypeIds.length > 5) {
      toastShort('不要超过5个类别哦');
      return;
    }
    if (tempTypeIds.length < 3) {
      toastShort('不要少于3个类别哦');
      return;
    }
    const { navigator } = this.props;
    InteractionManager.runAfterInteractions(() => {
      Storage.get('typeIds')
        .then((typeIds) => {
          if (typeIds.sort().toString() === Array.from(tempTypeIds).sort().toString()) {
            navigator.pop();
            return;
          }
          Storage.save('typeIds', this.state.typeIds)
                  .then(this.resetRoute);
        });
    });
  }

  resetRoute() {
    const { navigator } = this.props;
    navigator.resetTo({
      component: MainContainer,
      name: 'Main'
    });
  }

  renderItem(item) {
    const isSelect = Array.from(this.state.typeIds).indexOf(parseInt(item.id)) !== -1;
    return (
      <Button
        key={item.id}
        containerStyle={[{ margin: 10, padding: 10, borderRadius: 10,
          borderWidth: 1, borderColor: '#dddddd' },
          isSelect ? { backgroundColor: '#3e9ce9' } : { backgroundColor: '#fcfcfc' }]}
        style={[{ fontSize: 16, textAlign: 'center' },
          isSelect ? { color: '#fcfcfc' } : { color: 'black' }]}
        text={CATEGORIES[item.id]}
        onPress={() => this.onPress(item)}
      />
    );
  }

  render() {
    const { navigator, category } = this.props;
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title="分类"
          actions={toolbarActions}
          navigator={navigator}
          onActionSelected={this.onActionSelected}
        />
        <View style={{ padding: 10, backgroundColor: '#fcfcfc' }}>
          <Text style={{ color: 'black', fontSize: 16 }}>
            选择您感兴趣的3-5个类别
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f2f2f2' }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
});

Category.propTypes = propTypes;

export default Category;
