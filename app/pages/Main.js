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
  StyleSheet,
  ListView,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  InteractionManager,
  ActivityIndicator,
  DrawerLayoutAndroid,
  Image,
  Dimensions,
  Platform,
  View,
  DeviceEventEmitter
} from 'react-native';

import DrawerLayout from 'react-native-drawer-layout';
import TimeAgo from 'react-native-timeago';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import * as readAction from '../actions/read';
import LoadingView from '../components/LoadingView';
import ReadingToolbar from '../components/ReadingToolbar';
import About from '../pages/About';
import Feedback from '../pages/Feedback';
import CategoryContainer from '../containers/CategoryContainer';
import { toastShort } from '../utils/ToastUtil';
import Storage from '../utils/Storage';
import WebViewPage from '../pages/WebViewPage';
import { formatStringWithHtml } from '../utils/FormatUtil';

require('moment/locale/zh-cn');

const homeImg = require('../img/home.png');
const categoryImg = require('../img/category.png');
const inspectionImg = require('../img/inspection.png');
const infoImg = require('../img/info.png');
const menuImg = require('../img/menu.png');

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  read: PropTypes.object.isRequired
};

let canLoadMore;
let page = 1;
let loadMoreTime = 0;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      typeIds: [],
      typeList: {}
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.onIconClicked = this.onIconClicked.bind(this);
    this.onScroll = this.onScroll.bind(this);
    canLoadMore = false;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    DeviceEventEmitter.addListener('changeCategory', (typeIds) => {
      typeIds.forEach((typeId) => {
        dispatch(readAction.fetchArticles(false, true, typeId));
      });
      this.setState({
        typeIds
      });
    });
    InteractionManager.runAfterInteractions(() => {
      Storage.get('typeIds')
        .then((typeIds) => {
          if (!typeIds) {
            return;
          }
          typeIds.forEach((typeId) => {
            dispatch(readAction.fetchArticles(false, true, typeId));
          });
          Storage.get('typeList').then((typeList) =>
            this.setState({
              typeIds,
              typeList
            })
          );
        });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { read } = this.props;
    if (read.isLoadMore && !nextProps.read.isLoadMore && !nextProps.read.isRefreshing) {
      if (nextProps.read.noMore) {
        toastShort('没有更多数据了');
      }
    }
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('changeCategory');
  }

  onRefresh(typeId) {
    const { dispatch } = this.props;
    canLoadMore = false;
    dispatch(readAction.fetchArticles(true, false, typeId));
  }

  onPress(article) {
    const { navigator } = this.props;
    navigator.push({
      component: WebViewPage,
      name: 'WebViewPage',
      article
    });
  }

  onPressDrawerItem(index) {
    const { navigator } = this.props;
    this.drawer.closeDrawer();
    switch (index) {
      case 1:
        navigator.push({
          component: CategoryContainer,
          name: 'Category'
        });
        break;
      case 2:
        navigator.push({
          component: Feedback,
          name: 'Feedback'
        });
        break;
      case 3:
        navigator.push({
          component: About,
          name: 'About'
        });
        break;
      default:
        break;
    }
  }

  onIconClicked() {
    this.drawer.openDrawer();
  }

  onScroll() {
    if (!canLoadMore) {
      canLoadMore = true;
    }
  }

  onEndReached(typeId) {
    const time = Date.parse(new Date()) / 1000;
    if (canLoadMore && time - loadMoreTime > 1) {
      page++;
      const { dispatch } = this.props;
      dispatch(readAction.fetchArticles(false, false, typeId, true, page));
      canLoadMore = false;
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  }

  renderFooter() {
    const { read } = this.props;
    if (read.isLoadMore) {
      return (
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center', padding: 5 }}
        >
          <ActivityIndicator size="small" color="#3e9ce9" />
          <Text style={{ textAlign: 'center', fontSize: 16, marginLeft: 10 }}>
            数据加载中……
          </Text>
        </View>
      );
    }
    return null;
  }

  renderItem(article) {
    return (
      <TouchableOpacity onPress={() => this.onPress(article)}>
        <View style={styles.containerItem}>
          <Image
            style={{ width: 88, height: 66, marginRight: 10 }}
            source={{ uri: article.contentImg }}
          />
          <View style={{ flex: 1, flexDirection: 'column' }} >
            <Text style={styles.title}>
              {formatStringWithHtml(article.title)}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} >
              <Text
                style={{ flex: 1, fontSize: 14, color: '#87CEFA',
                  marginTop: 5, marginRight: 5 }}
              >
                {article.userName}
              </Text>
              <TimeAgo
                style={{ fontSize: 14, color: '#aaaaaa', marginTop: 5 }}
                time={article.date}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderContent(dataSource, typeId) {
    const { read } = this.props;
    if (read.loading) {
      return <LoadingView />;
    }
    const isEmpty = read.articleList[typeId] === undefined || read.articleList[typeId].length === 0;
    if (isEmpty) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          contentContainerStyle={styles.no_data}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              style={{ backgroundColor: 'transparent' }}
              refreshing={read.isRefreshing}
              onRefresh={() => this.onRefresh(typeId)}
              title="Loading..."
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>
              目前没有数据，请刷新重试……
            </Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ListView
        initialListSize={1}
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
        onEndReached={() => this.onEndReached(typeId)}
        onEndReachedThreshold={10}
        onScroll={this.onScroll}
        renderFooter={this.renderFooter}
        refreshControl={
          <RefreshControl
            style={{ backgroundColor: 'transparent' }}
            refreshing={read.isRefreshing}
            onRefresh={() => this.onRefresh(typeId)}
            title="Loading..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }
      />
    );
  }

  renderNavigationViewItem(image, title, index) {
    return (
      <TouchableOpacity
        style={styles.drawerContent}
        onPress={() => this.onPressDrawerItem(index)}
      >
        <Image
          style={styles.drawerIcon}
          source={image}
        />
        <Text style={styles.drawerText}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  renderNavigationView() {
    return (
      <View style={[styles.container, { backgroundColor: '#fcfcfc' }]}>
        <View
          style={{ height: 120, justifyContent: 'flex-end',
            padding: 20, backgroundColor: '#3e9ce9' }}
        >
          <Text style={{ fontSize: 20, textAlign: 'left', color: '#fcfcfc' }}>
            iReading
          </Text>
          <Text style={{ fontSize: 20, textAlign: 'left', color: '#fcfcfc' }}>
            让生活更精彩
          </Text>
        </View>
        {this.renderNavigationViewItem(homeImg, '首页', 0)}
        {this.renderNavigationViewItem(categoryImg, '分类', 1)}
        {this.renderNavigationViewItem(inspectionImg, '建议', 2)}
        {this.renderNavigationViewItem(infoImg, '关于', 3)}
      </View>
    );
  }

  render() {
    const { read, navigator } = this.props;
    return (
      <DrawerLayout
        ref={(ref) => { this.drawer = ref; }}
        drawerWidth={Dimensions.get('window').width / 5 * 3}
        drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Left : 'left'}
        renderNavigationView={this.renderNavigationView}
      >
        <View style={styles.container}>
          <ReadingToolbar
            title="iReading"
            navigator={navigator}
            navIcon={menuImg}
            onIconClicked={this.onIconClicked}
          />
          <ScrollableTabView
            renderTabBar={() =>
              <DefaultTabBar
                underlineHeight={2}
                tabStyle={{ paddingBottom: 0 }}
                textStyle={{ fontSize: 16 }}
              />
            }
            tabBarBackgroundColor="#fcfcfc"
            tabBarUnderlineColor="#3e9ce9"
            tabBarActiveTextColor="#3e9ce9"
            tabBarInactiveTextColor="#aaaaaa"
          >
            {this.state.typeIds.map((typeId) => {
              let name = '';
              for (let i = 0, l = this.state.typeList.length; i < l; i++) {
                if (typeId.toString() === this.state.typeList[i].id) {
                  name = this.state.typeList[i].name;
                  break;
                }
              }
              const typeView = (
                <View
                  key={typeId}
                  tabLabel={name}
                  style={{ flex: 1 }}
                >
                  {this.renderContent(this.state.dataSource.cloneWithRows(
                    read.articleList[typeId] === undefined ? [] :
                      read.articleList[typeId]), typeId) }
                </View>);
              return typeView;
            }) }
          </ScrollableTabView>
        </View>
      </DrawerLayout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF'
  },
  containerItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black'
  },
  listView: {
    backgroundColor: '#eeeeec'
  },
  no_data: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black'
  }
});

Main.propTypes = propTypes;

export default Main;
