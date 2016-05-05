'use strict';

import React, {PropTypes} from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  Alert,
  BackAndroid,
  View
} from 'react-native';

import ReadingToolbar from '../components/ReadingToolbar';
import {fetchTypes} from '../actions/category';
import Storage from '../utils/Storage';
import GridView from '../components/GridView';
import Button from '../components/Button';
import {ToastShort} from '../utils/ToastUtils';
import MainContainer from '../containers/MainContainer';
import {CATEGORIES} from '../constants/Alias';

let toolbarActions = [
  {title: '提交', icon: require('../img/check.png'), show: 'always'}
];
var _typeIds = new Array();

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
      typeIds: _typeIds
    };
  }

  componentWillMount() {
    Storage.get('typeIds')
      .then((typeIds) => {
        _typeIds = typeIds;
        this.setState({
          typeIds: typeIds
        });
      });
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchTypes());
  }

  onPress(type) {
    let pos = _typeIds.indexOf(parseInt(type.id));
    if (pos == -1) {
      _typeIds.push(parseInt(type.id));
    } else {
      _typeIds.splice(pos, 1);
    }
    this.setState({
      typeIds: _typeIds
    });
  }

  resetRoute() {
    const {navigator} = this.props;
    navigator.resetTo({
      component: MainContainer,
      name: 'Main'
    });
  }

  onActionSelected() {
    if (_typeIds.length > 5) {
      ToastShort('不要超过5个类别哦');
      return;
    }
    if (_typeIds.length < 3) {
      ToastShort('不要少于3个类别哦');
      return;
    }
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      Storage.get('typeIds')
        .then((typeIds) => {
          if (typeIds.sort().toString() == Array.from(_typeIds).sort().toString()) {
            navigator.pop();
            return;
          }
          Alert.alert(
            '提醒',
            '应用即将关闭，再次打开分类生效', [{
              text: '取消',
              style: 'cancel'
            }, {
              text: '确认',
              onPress: () => {
                Storage.save('typeIds', this.state.typeIds)
                  .then(this.resetRoute);
                BackAndroid.exitApp();
              }
            }]
          );
        });
    });
  }

  renderItem(item) {
    let isSelect = Array.from(this.state.typeIds).indexOf(parseInt(item.id)) != -1;
    return (
      <Button
        key={item.id}
        containerStyle={[{margin: 10, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#dddddd'}, isSelect ? {backgroundColor: '#3e9ce9'} : {backgroundColor: '#fcfcfc'}]}
        style={[{fontSize: 16, textAlign: 'center'}, isSelect ? {color: '#fcfcfc'} : {color: 'black'}]}
        text={CATEGORIES[item.id]}
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
          <Text style={{color: 'black', fontSize: 16}}>
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
});

Category.propTypes = propTypes;

export default Category;