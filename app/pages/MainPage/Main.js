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
    DeviceEventEmitter,
    InteractionManager,
    ListView,
    StyleSheet,
    View
} from 'react-native';
import ScrollableTabView, {
    DefaultTabBar
} from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import ItemCell from './ItemCell';
import Footer from './Footer';
import EmptyContent from './EmptyContent';
import MainContent from './MainContent';

const _ = require('lodash');

require('moment/locale/zh-cn');

const propTypes = {
  readActions: PropTypes.object,
  read: PropTypes.object.isRequired
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
                    })
                );
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
        ToastUtil.showShort('没有更多数据了');
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

  onRefresh = (typeId) => {
    const { readActions } = this.props;
    readActions.requestArticleList(true, false, typeId);
    const index = this.state.typeIds.indexOf(typeId);
    if (index >= 0) {
      pages[index] = 1;
    }
  };

  onPress = (article) => {
    const { navigate } = this.props.navigation;
    navigate('Web', { article });
  };

  onIconClicked = () => {
    this.drawer.openDrawer();
  };

  onEndReached = (typeId) => {
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
  };

  renderFooter = () => {
    const { read } = this.props;
    return read.isLoadMore ? <Footer /> : <View />;
  };

  renderItem = article =>
    (<ItemCell
      article={article}
      onPressHandler={this.onPress}
    />);

  removeExpiredItem = (articleList) => {
    _.remove(articleList, fruit => fruit.expire);
    return articleList || [];
  };

  renderContent = (dataSource, typeId) => {
    const { read } = this.props;
    if (read.loading) {
      return <LoadingView />;
    }
    const isEmpty =
            read.articleList[typeId] === undefined ||
            read.articleList[typeId].length === 0;
    if (isEmpty) {
      return (
        <EmptyContent
          read={read}
          tyepId={typeId}
          onRefresh={this.onRefresh}
        />
      );
    }
    return (
      <MainContent
        dataSource={dataSource}
        typeId={typeId}
        isRefreshing={read.isRefreshing}
        onEndReached={this.onEndReached}
        onRefresh={this.onRefresh}
        renderFooter={this.renderFooter}
        renderItem={this.renderItem}
      />
    );
  };

  render() {
    const { read } = this.props;
    return (
      <View style={styles.container}>
        <ScrollableTabView
          renderTabBar={() =>
            <DefaultTabBar tabStyle={styles.tab} textStyle={styles.tabText} />}
          tabBarBackgroundColor="#fcfcfc"
          tabBarUnderlineStyle={styles.tabBarUnderline}
          tabBarActiveTextColor="#3e9ce9"
          tabBarInactiveTextColor="#aaaaaa"
        >
          {this.state.typeIds.map((typeId) => {
            let name;
            if (this.state.typeList === null) {
              return null;
            }
            name = _.head(_.filter(this.state.typeList, o => o.id === typeId.toString())).name;
            const typeView = (
              <View key={typeId} tabLabel={name} style={styles.base}>
                {this.renderContent(
                                  this.state.dataSource.cloneWithRows(
                                      read.articleList[typeId] === undefined
                                          ? []
                                          : this.removeExpiredItem(read.articleList[typeId])
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
    backgroundColor: '#fff'
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

export default Main;
