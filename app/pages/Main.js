'use strict';

import React from 'react-native';
const {
  StyleSheet,
  ListView,
  RefreshControl,
  ScrollView,
  Text,
  PropTypes,
  View
} = React;
import LoadingView from '../components/LoadingView';
import {fetchArticles} from '../actions/read';
import ReadingTabBar from '../components/ReadingTabBar';
import ReadingToolbar from '../components/ReadingToolbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {ToastShort} from '../utils/ToastUtils';

let toolbarActions = [
  {title: '分享', show: 'always'}
]

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  read: PropTypes.object.isRequired
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onActionSelected = this.onActionSelected.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchArticles(false, true, 0));
    dispatch(fetchArticles(false, true, 9));
    dispatch(fetchArticles(false, true, 18));
  }

  onActionSelected(){
    ToastShort('分享！');
  }

  onRefresh() {
    const {dispatch} = this.props;
    dispatch(fetchArticles(true, false, 18));
  }

  renderItem(article, sectionID, rowID) {
    return (
      <View style={styles.containerItem}>
        <Text style={styles.title}>
          {article.title}
        </Text>
      </View>
    );
  }

  renderContent(dataSource, typeId) {
    const {read} = this.props;
    if (read.loading) {
      return <LoadingView/>;
    }
    let isEmpty = false;
    switch (typeId) {
      case 0:
        isEmpty = read.hotList == undefined || read.hotList.length == 0;
        break;
      case 9:
        isEmpty = read.itList == undefined || read.itList.length == 0;
        break;
      case 18:
        isEmpty = read.constellationList == undefined || read.constellationList.length == 0;
        break;
      default:
        break;
    }
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
              onRefresh={this.onRefresh}
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
        refreshControl={
          <RefreshControl
            refreshing={read.isRefreshing}
            onRefresh={this.onRefresh}
            title="Loading..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }
      />
    );
  }

  render() {
    const {read} = this.props;
    let hotSource = this.state.dataSource.cloneWithRows(read.hotList);
    let itSource = this.state.dataSource.cloneWithRows(read.itList);
    let constellationSource = this.state.dataSource.cloneWithRows(read.constellationList);
    return (
      <View style={styles.container}>
        <ReadingToolbar
          actions={toolbarActions}
          onActionSelected={this.onActionSelected}
          title={'eading'}
        />
        <ScrollableTabView
          renderTabBar={() => <ReadingTabBar />}
          tabBarBackgroundColor="#fcfcfc"
          tabBarUnderlineColor="#3e9ce9"
          tabBarActiveTextColor="#3e9ce9"
        >
          <View
            tabLabel="热门"
            style={{flex: 1}}
          >
            {this.renderContent(hotSource, 0)}
          </View>
          <View
            tabLabel="科技"
            style={{flex: 1}}
          >
            {this.renderContent(itSource, 9)}
          </View>
          <View
            tabLabel="星座"
            style={{flex: 1}}
          >
            {this.renderContent(constellationSource, 18)}
          </View>
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
    backgroundColor: '#eeeeec',
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  title: {
    flex: 3,
    fontSize: 18,
    textAlign: 'left',
    color: '#aaaaaa'
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