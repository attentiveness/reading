'use strict';

import React, {PropTypes} from 'react';
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
  View
} from 'react-native';
import LoadingView from '../components/LoadingView';
import DrawerLayout from 'react-native-drawer-layout';
import {fetchArticles} from '../actions/read';
import ReadingToolbar from '../components/ReadingToolbar';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import About from '../pages/About';
import Feedback from '../pages/Feedback';
import CategoryContainer from '../containers/CategoryContainer';
import {ToastShort} from '../utils/ToastUtils';
import Storage from '../utils/Storage';
import {CATEGORIES} from '../constants/Alias';
import WebViewPage from '../pages/WebViewPage';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  read: PropTypes.object.isRequired
};

var canLoadMore;
var page = 1;
var loadMoreTime = 0;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      typeIds: []
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderNavigationView = this.renderNavigationView.bind(this);
    this.onIconClicked = this.onIconClicked.bind(this);
    this.onScroll = this.onScroll.bind(this);
    canLoadMore = false;
  }

  componentDidMount() {
    const {dispatch} = this.props;
    InteractionManager.runAfterInteractions(() => {
      Storage.get('typeIds')
        .then((typeIds) => {
          if (!typeIds) {
            typeIds = [0, 12, 9, 2];
          }
          typeIds.forEach((typeId) => {
            dispatch(fetchArticles(false, true, typeId));
          });
          this.setState({
            typeIds: typeIds
          });
        });
    });
  }

  componentWillReceiveProps(nextProps) {
    const {read} = this.props;
    if (read.isLoadMore && !nextProps.read.isLoadMore && !nextProps.read.isRefreshing) {
      if (nextProps.read.noMore) {
        ToastShort('没有更多数据了');
      }
    }
  }

  onRefresh(typeId) {
    const {dispatch} = this.props;
    canLoadMore = false;
    dispatch(fetchArticles(true, false, typeId));
  }

  onPress(article) {
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: WebViewPage,
        name: 'WebViewPage',
        article: article
      });
    });
  }

  onPressDrawerItem(index) {
    const {navigator} = this.props;
    this.refs.drawer.closeDrawer();
    switch (index) {
      case 1:
        InteractionManager.runAfterInteractions(() => {
          navigator.push({
            component: CategoryContainer,
            name: 'Category'
          });
        });
        break;
      case 2:
        InteractionManager.runAfterInteractions(() => {
          navigator.push({
            component: Feedback,
            name: 'Feedback'
          });
        });
        break;
      case 3:
        InteractionManager.runAfterInteractions(() => {
          navigator.push({
            component: About,
            name: 'About'
          });
        });
        break;
      default:
        break;
    }
  }

  onIconClicked() {
    this.refs.drawer.openDrawer();
  }

  onScroll() {
    if (!canLoadMore) {
      canLoadMore = true;
    }
  }

  onEndReached(typeId) {
    let time = Date.parse(new Date()) / 1000;
    if (canLoadMore && time - loadMoreTime > 1) {
      page++;
      const {dispatch} = this.props;
      dispatch(fetchArticles(false, false, typeId, true, page));
      canLoadMore = false;
      loadMoreTime = Date.parse(new Date()) / 1000;
    }
  }

  renderFooter() {
    const {read} = this.props;
    if (read.isLoadMore) {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 5}}>
          <ActivityIndicator size='small' color='#3e9ce9' />
          <Text style={{textAlign: 'center', fontSize: 16, marginLeft: 10}}>
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
    let isEmpty = read.articleList[typeId] === undefined || read.articleList[typeId].length === 0;
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
        initialListSize={1}
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

  renderNavigationView() {
    return (
      <View style={[styles.container, {backgroundColor: '#fcfcfc'}]}>
        <View
          style={{width: Dimensions.get('window').width / 5 * 3, height: 120, justifyContent: 'flex-end', paddingBottom: 10, backgroundColor: '#3e9ce9'}}
        >
          <Text style={{fontSize: 20, textAlign: 'left', color: '#fcfcfc', marginLeft: 10}}>
            Reading
          </Text>
          <Text style={{fontSize: 20, textAlign: 'left', color: '#fcfcfc', marginLeft: 10}}>
            让生活更精彩
          </Text>
        </View>
        <TouchableOpacity
          style={styles.drawerContent}
          onPress={this.onPressDrawerItem.bind(this, 0)}
        >
          <Image
            style={styles.drawerIcon}
            source={require('../img/home.png')}
          />
          <Text style={styles.drawerText}>
            首页
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerContent}
          onPress={this.onPressDrawerItem.bind(this, 1)}
        >
          <Image
            style={styles.drawerIcon}
            source={require('../img/category.png')}
          />
          <Text style={styles.drawerText}>
            分类
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerContent}
          onPress={this.onPressDrawerItem.bind(this, 2)}
        >
          <Image
            style={styles.drawerIcon}
            source={require('../img/inspection.png')}
          />
          <Text style={styles.drawerText}>
            建议
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerContent}
          onPress={this.onPressDrawerItem.bind(this, 3)}
        >
          <Image
            style={styles.drawerIcon}
            source={require('../img/info.png')}
          />
          <Text style={styles.drawerText}>
            关于
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {read, navigator} = this.props;
    return (
      <DrawerLayout
        ref='drawer'
        drawerWidth={Dimensions.get('window').width / 5 * 3}
        drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Left : 'left'}
        renderNavigationView={this.renderNavigationView}
      >
        <View style={styles.container}>
          <ReadingToolbar
            title="Reading"
            navigator={navigator}
            navIcon={require('../img/menu.png')}
            onIconClicked={this.onIconClicked}
          />
          <ScrollableTabView
            renderTabBar={() => 
              <DefaultTabBar
                underlineHeight={2}
                textStyle={{fontSize: 16, marginTop: 6}} />
            }
            tabBarBackgroundColor="#fcfcfc"
            tabBarUnderlineColor="#3e9ce9"
            tabBarActiveTextColor="#3e9ce9"
            tabBarInactiveTextColor="#aaaaaa"
          >
          {this.state.typeIds.map((typeId, i) => {
            return (
              <View
                key={typeId}
                tabLabel={CATEGORIES[typeId]}
                style={{flex: 1}}
              >
                {this.renderContent(this.state.dataSource.cloneWithRows(read.articleList[typeId] === undefined ? [] : read.articleList[typeId]), typeId)}
              </View>);
          })}
          </ScrollableTabView>
        </View>
      </DrawerLayout>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
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