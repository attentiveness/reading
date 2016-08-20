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
import React, { PropTypes } from 'react';
import {
  InteractionManager,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
  ScrollView,
  RefreshControl,
  Alert
} from 'react-native';

import AV from 'leancloud-storage';
import ReadingToolbar from '../components/ReadingToolbar';
import { fetchTypes } from '../actions/category';
import Storage from '../utils/Storage';
import GridView from '../components/GridView';
import Button from '../components/Button';
import { toastShort } from '../utils/ToastUtil';
import MainContainer from '../containers/MainContainer';

const checkIno = require('../img/check.png');

let toolbarActions = [
  { title: '提交', icon: checkIno, show: 'always' }
];
let tempTypeIds = [];
let maxCategory = 5; // 默认最多5个类别，远端可配置

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
    this.onRefresh = this.onRefresh.bind(this);
    this.state = {
      typeIds: tempTypeIds
    };
  }

  componentWillMount() {
    const { route } = this.props;
    if (!route.isFirst) {
      InteractionManager.runAfterInteractions(() => {
        Storage.get('typeIds')
          .then((typeIds) => {
            tempTypeIds = typeIds;
            this.setState({
              typeIds
            });
          });
      });
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTypes());
    const query = new AV.Query('Reading_Settings');
    query.get('57b86e0ba633bd002a96436b').then((settings) => {
      maxCategory = settings.get('max_category');
    });
  }

  onRefresh() {
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

  onSelectCatagory() {
    const { navigator } = this.props;
    if (this.state.typeIds.length === 0) {
      Alert.alert(
        '提示',
        '您确定不选择任何分类吗？',
        [
          { text: '取消', style: 'cancel' },
          {
            text: '确定', onPress: () => {
              Storage.save('typeIds', this.state.typeIds);
              navigator.replace({
                component: MainContainer,
                name: 'Main'
              });
            }
          },
        ]
      );
    } else {
      Storage.save('typeIds', this.state.typeIds);
      navigator.replace({
        component: MainContainer,
        name: 'Main'
      });
    }
  }

  onActionSelected() {
    if (tempTypeIds.length > maxCategory) {
      toastShort(`不要超过${maxCategory}个类别哦`);
      return;
    }
    if (tempTypeIds.length < 1) {
      toastShort('不要少于1个类别哦');
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
    DeviceEventEmitter.emit('changeCategory', this.state.typeIds);
    navigator.pop();
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
        text={item.name}
        onPress={() => this.onPress(item)}
      />
    );
  }

  renderGridView() {
    const { category } = this.props;
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        horizontal={false}
        contentContainerStyle={styles.no_data}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={category.loading}
            onRefresh={this.onRefresh}
            title="Loading..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }
      >
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#f2f2f2' }}>
          <GridView
            items={Array.from(category.typeList)}
            itemsPerRow={3}
            renderItem={this.renderItem}
          />
        </View>
      </ScrollView>
    );
  }

  render() {
    const { navigator, route } = this.props;
    if (route.isFirst) {
      return (
        <View style={styles.container}>
          <View style={{ padding: 10, backgroundColor: '#fcfcfc' }}>
            <Text style={{ color: 'black', fontSize: 16 }}>
              初次见面，请选择您感兴趣的1-5个类别
            </Text>
          </View>
          {this.renderGridView()}
          <Button
            containerStyle={{ margin: 10, padding: 10, borderRadius: 10, backgroundColor: 'green' }}
            style={{ fontSize: 16, textAlign: 'center', color: '#fff' }}
            text={"确认"}
            onPress={() => this.onSelectCatagory()}
          />
        </View>
      );
    }
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
            请选择您感兴趣的1-5个类别
          </Text>
        </View>
        {this.renderGridView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  }
});

Category.propTypes = propTypes;

export default Category;
