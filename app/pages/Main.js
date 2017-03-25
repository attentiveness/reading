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
  Image,
  View,
  DeviceEventEmitter,
  Platform
} from 'react-native';

import TimeAgo from 'react-native-timeago';
import ScrollableTabView, {
  DefaultTabBar
} from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
import LoadingView from '../components/LoadingView';
import { toastShort } from '../utils/ToastUtil';
import { formatStringWithHtml } from '../utils/FormatUtil';

require('moment/locale/zh-cn');

const propTypes = {
  readActions: PropTypes.object,
  read: PropTypes.object.isRequired
};

const contextTypes = {
  routes: PropTypes.object.isRequired
};

const pages = [];
let loadMoreTime = 0;
let currentLoadMoreTypeId;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      typeIds: [],
      typeList: {}
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onIconClicked = this.onIconClicked.bind(this);
  }

  componentDidMount() {
    const { readActions } = this.props;
    DeviceEventEmitter.addListener('changeCategory', (typeIds) => {
      typeIds.forEach((typeId) => {
        readActions.requestArticleList(false, true, typeId);
        pages.push(1);
      });
      this.setState({
        typeIds
      });
    });
    InteractionManager.runAfterInteractions(() => {
      store.get('typeIds').then((typeIds) => {
        if (!typeIds) {
          return;
        }
        typeIds.forEach((typeId) => {
          readActions.requestArticleList(false, true, typeId);
          pages.push(1);
        });
        store.get('typeList').then(typeList =>
          this.setState({
            typeIds,
            typeList
          }));
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { read } = this.props;
    if (
      read.isLoadMore &&
      !nextProps.read.isLoadMore &&
      !nextProps.read.isRefreshing
    ) {
      if (nextProps.read.noMore) {
        toastShort('没有更多数据了');
        const index = this.state.typeIds.indexOf(currentLoadMoreTypeId);
        if (index >= 0) {
          pages[index] -= 1;
        }
      }
    }
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeAllListeners('changeCategory');
  }

  onRefresh(typeId) {
    const { readActions } = this.props;
    readActions.requestArticleList(true, false, typeId);
    const index = this.state.typeIds.indexOf(typeId);
    if (index >= 0) {
      pages[index] = 1;
    }
  }

  onPress(article) {
    const { routes } = this.context;
    routes.web({ article });
  }

  onIconClicked() {
    this.drawer.openDrawer();
  }

  onEndReached(typeId) {
    currentLoadMoreTypeId = typeId;
    const time = Date.parse(new Date()) / 1000;
    const index = this.state.typeIds.indexOf(typeId);
    if (index < 0) {
      return;
    }
    if (time - loadMoreTime > 1) {
      pages[index] += 1;
      const { readActions } = this.props;
      readActions.requestArticleList(false, false, typeId, true, pages[index]);
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  }

  renderFooter() {
    const { read } = this.props;
    if (read.isLoadMore) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size="small" color="#3e9ce9" />
          <Text style={styles.footerText}>
            数据加载中……
          </Text>
        </View>
      );
    }
    return <View />;
  }

  renderItem(article) {
    return (
      <TouchableOpacity onPress={() => this.onPress(article)}>
        <View style={styles.containerItem}>
          <Image style={styles.itemImg} source={{ uri: article.contentImg }} />
          <View style={styles.itemRightContent}>
            <Text style={styles.title}>
              {formatStringWithHtml(article.title)}
            </Text>
            <View style={styles.itemRightBottom}>
              <Text style={styles.userName}>
                {article.userName}
              </Text>
              <TimeAgo style={styles.timeAgo} time={article.date} />
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
    const isEmpty = read.articleList[typeId] === undefined ||
      read.articleList[typeId].length === 0;
    if (isEmpty) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          contentContainerStyle={styles.no_data}
          style={styles.base}
          refreshControl={
            <RefreshControl
              style={styles.refreshControlBase}
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
        renderFooter={this.renderFooter}
        refreshControl={
          <RefreshControl
            style={styles.refreshControlBase}
            refreshing={read.isRefreshing}
            onRefresh={() => this.onRefresh(typeId)}
            title="Loading..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }
      />
    );
  }

  render() {
    const { read } = this.props;
    return (
      <View style={styles.container}>
        <ScrollableTabView
          renderTabBar={() => (
            <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText} />
          )}
          tabBarBackgroundColor="#fcfcfc"
          tabBarUnderlineStyle={styles.tabBarUnderline}
          tabBarActiveTextColor="#3e9ce9"
          tabBarInactiveTextColor="#aaaaaa"
        >
          {this.state.typeIds.map((typeId) => {
            let name = '';
            if (this.state.typeList === null) {
              return null;
            }
            for (let i = 0, l = this.state.typeList.length; i < l; i++) {
              if (typeId.toString() === this.state.typeList[i].id) {
                name = this.state.typeList[i].name;
                break;
              }
            }
            const typeView = (
              <View key={typeId} tabLabel={name} style={styles.base}>
                {this.renderContent(
                  this.state.dataSource.cloneWithRows(
                    read.articleList[typeId] === undefined
                      ? []
                      : read.articleList[typeId]
                  ),
                  typeId
                )}
              </View>
            );
            return typeView;
          })}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'ios' ? 10 : 0
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
  drawerTitleContent: {
    height: 120,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: '#3e9ce9'
  },
  drawerIcon: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  drawerTitle: {
    fontSize: 20,
    textAlign: 'left',
    color: '#fcfcfc'
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black'
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 10
  },
  itemImg: {
    width: 88,
    height: 66,
    marginRight: 10
  },
  itemRightContent: {
    flex: 1,
    flexDirection: 'column'
  },
  itemRightBottom: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    flex: 1,
    fontSize: 14,
    color: '#87CEFA',
    marginTop: 5,
    marginRight: 5
  },
  timeAgo: {
    fontSize: 14,
    color: '#aaaaaa',
    marginTop: 5
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  },
  tab: {
    paddingBottom: 0
  },
  tabText: {
    fontSize: 16
  },
  tabBarUnderline: {
    backgroundColor: '#3e9ce9',
    height: 2
  }
});

Main.propTypes = propTypes;
Main.contextTypes = contextTypes;

export default Main;
