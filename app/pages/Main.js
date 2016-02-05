'use strict';

import React from 'react-native';
const {
  StyleSheet,
  ListView,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  PropTypes,
  InteractionManager,
  ProgressBarAndroid,
  Image,
  View
} = React;
import LoadingView from '../components/LoadingView';
import {fetchArticles} from '../actions/read';
import ReadingTabBar from '../components/ReadingTabBar';
import ReadingToolbar from '../components/ReadingToolbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import WebViewContainer from '../containers/WebViewContainer';
import AboutContainer from '../containers/AboutContainer';
import {ToastShort} from '../utils/ToastUtils';

let toolbarActions = [
  {title: '设置', icon: require('../img/settings.png'), show: 'always'}
];

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  read: PropTypes.object.isRequired
}

var canLoadMore, currentTypeId;
var page = 1;
let typeIds = [0, 12, 9, 2];
var loadMoreTime = 0;
let categories = {0: "热门", 12: "点赞", 9: "科技", 2: "段子"};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onActionSelected = this.onActionSelected.bind(this);
    this.onScroll = this.onScroll.bind(this);
    canLoadMore = false;
  }

  componentDidMount() {
    const {dispatch} = this.props;
    typeIds.forEach((typeId) => {
      dispatch(fetchArticles(false, true, typeId));
    });
  }

  componentWillReceiveProps(nextProps) {
    const {read} = this.props;
    if (read.isLoadMore && !nextProps.read.isLoadMore && !nextProps.read.isRefreshing) {
      if (nextProps.read.noMore) {
        ToastShort('没有更多数据了');
      };
    }
  }

  onRefresh(typeId) {
    const {dispatch} = this.props;
    dispatch(fetchArticles(true, false, typeId));
  }

  onPress(article) {
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: WebViewContainer,
        name: 'WebViewPage',
        article: article
      });
    });
  }

  onActionSelected() {
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: AboutContainer,
        name: 'About'
      });
    });
  }

  onScroll() {
    if (!canLoadMore) {
      canLoadMore = true;
    };
  }

  onEndReached(typeId) {
    let time = Date.parse(new Date()) / 1000;
    if (canLoadMore && time - loadMoreTime > 1) {
      page++;
      currentTypeId = typeId;
      const {dispatch} = this.props;
      dispatch(fetchArticles(false, false, typeId, true, page));
      canLoadMore = false;
      loadMoreTime = Date.parse(new Date()) / 1000;
    };
  }

  renderFooter() {
    const {read} = this.props;
    if (read.isLoadMore) {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <ProgressBarAndroid styleAttr='Inverse' color='#3e9ce9' />
          <Text style={{textAlign: 'center', fontSize: 16}}>
            数据加载中……
          </Text>
        </View>
      );
    }
  }

  renderItem(article, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={this.onPress.bind(this, article)}>
        <View style={styles.containerItem}>
          <Image
            style={{width: 88, height: 66, marginRight: 10}}
            source={{uri: article.contentImg}}
          />
          <View style={{flex: 1, flexDirection: 'column'}} >
            <Text style={styles.title}>
              {article.title}
            </Text>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}} >
              <Text style={{fontSize: 14, color: '#aaaaaa', marginTop: 5}}>
                来自微信公众号：
              </Text>
              <Text style={{flex: 1, fontSize: 14, color: '#87CEFA', marginTop: 5, marginRight: 5}}>
                {article.userName}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderContent(dataSource, typeId) {
    const {read} = this.props;
    if (read.loading) {
      return <LoadingView/>;
    }
    let isEmpty = read.articleList[typeId] == undefined || read.articleList[typeId].length == 0;
    if (isEmpty) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          contentContainerStyle={styles.no_data}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={read.isRefreshing}
              onRefresh={this.onRefresh.bind(this, typeId)}
              title="Loading..."
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
        >
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>
              目前没有数据，请刷新重试……
            </Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
        onEndReached={this.onEndReached.bind(this, typeId)}
        onEndReachedThreshold={10}
        onScroll={this.onScroll}
        renderFooter={this.renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={read.isRefreshing}
            onRefresh={this.onRefresh.bind(this, typeId)}
            title="Loading..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }
      />
    );
  }

  render() {
    const {read, navigator} = this.props;
    let hotSource, zanSource, itSource, jokeSource;
    var lists = [];
    typeIds.forEach((typeId) => {
      lists.push(
        <View
          key={typeId}
          tabLabel={categories[typeId]}
          style={{flex: 1}}
        >
          {this.renderContent(this.state.dataSource.cloneWithRows(read.articleList[typeId] == undefined ? [] : read.articleList[typeId]), typeId)}
        </View>);
    });
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title={'eading'}
          actions={toolbarActions}
          navigator={navigator}
          onActionSelected={this.onActionSelected}
        />
        <ScrollableTabView
          renderTabBar={() => <ReadingTabBar />}
          tabBarBackgroundColor="#fcfcfc"
          tabBarUnderlineColor="#3e9ce9"
          tabBarActiveTextColor="#3e9ce9"
          tabBarInactiveTextColor="#aaaaaa"
        >
        {lists}
        </ScrollableTabView>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    flex: 3,
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
  }
})

Main.propTypes = propTypes;

export default Main;