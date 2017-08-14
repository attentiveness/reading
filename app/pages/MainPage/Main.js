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
import { ListView, StyleSheet, View } from 'react-native';
import ScrollableTabView, {
  DefaultTabBar
} from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';

import LoadingView from '../../components/LoadingView';
import ToastUtil from '../../utils/ToastUtil';
import { getArticleList, getTypeName, isNotEmpty } from '../../utils/ItemsUtil';
import ItemCell from './ItemCell';
import Footer from './Footer';
import EmptyView from './EmptyView';
import ItemListView from './ItemListView';

require('moment/locale/zh-cn');
const _ = require('lodash');

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
      typeList: {}
    };
  }

  componentDidMount() {
    this.retrieveArticleLists(this.props.selectedCategoryIds);

    store.get('typeList').then((typeList) => {
      this.setState({
        typeList
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { read } = this.props;
    this.retrieveArticleListsWhenNeeded(
      nextProps.selectedCategoryIds,
      this.props.selectedCategoryIds
    );
    if (
      read.isLoadMore &&
      !nextProps.read.isLoadMore &&
      !nextProps.read.isRefreshing
    ) {
      if (nextProps.read.noMore) {
        ToastUtil.showShort('没有更多数据了');
        const index = this.props.selectedCategoryIds.indexOf(
          currentLoadMoreTypeId
        );
        if (index >= 0) {
          pages[index] -= 1;
        }
      }
    }
  }

  onRefresh = (typeId) => {
    const { readActions } = this.props;
    readActions.requestArticleList(true, false, typeId);
    const index = this.props.selectedCategoryIds.indexOf(typeId);
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
    const index = this.props.selectedCategoryIds.indexOf(typeId);
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

  retrieveArticleListsWhenNeeded(newSelectedCategoryIds, selectedCategoryIds) {
    if (
      isNotEmpty(_.differenceBy(newSelectedCategoryIds, selectedCategoryIds))
    ) {
      this.retrieveArticleLists(
        _.differenceBy(newSelectedCategoryIds, selectedCategoryIds)
      );
    }
    pages.push(1);
  }

  retrieveArticleLists = (categoryIds) => {
    const { readActions } = this.props;
    if (isNotEmpty(categoryIds)) {
      categoryIds.forEach((categoryId) => {
        readActions.requestArticleList(false, true, categoryId);
        pages.push(1);
      });
    }
  };

  renderFooter = () => {
    const { read } = this.props;
    return read.isLoadMore ? <Footer /> : <View />;
  };

  renderItem = article =>
    <ItemCell article={article} onPressHandler={this.onPress} />;

  renderContent = (dataSource, typeId) => {
    const { read } = this.props;
    if (read.loading) {
      return <LoadingView />;
    }
    if (_.isEmpty(read.articleList[typeId])) {
      return (
        <EmptyView read={read} tyepId={typeId} onRefresh={this.onRefresh} />
      );
    }
    return (
      <ItemListView
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
    const content = this.props.selectedCategoryIds.map((typeId) => {
      if (_.isEmpty(this.state.typeList)) {
        return null;
      }
      const name = getTypeName(this.state.typeList, typeId);
      const typeView = (
        <View key={typeId} tabLabel={name} style={styles.base}>
          {this.renderContent(
            this.state.dataSource.cloneWithRows(
              getArticleList(read.articleList[typeId])
            ),
            typeId
          )}
        </View>
      );
      return typeView;
    });
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
          {isNotEmpty(this.props.selectedCategoryIds) && content}
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
