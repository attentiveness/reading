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
  View
} = React;
import LoadingView from '../components/LoadingView';
import {fetchArticles} from '../actions/read';
import ReadingTabBar from '../components/ReadingTabBar';
import ReadingToolbar from '../components/ReadingToolbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import WebViewContainer from '../containers/WebViewContainer';

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
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchArticles(false, true, 0));
    dispatch(fetchArticles(false, true, 9));
    dispatch(fetchArticles(false, true, 18));
  }

  onRefresh(typeId) {
    const {dispatch} = this.props;
    switch (typeId) {
      case 0:
        dispatch(fetchArticles(true, false, 0));
        break;
      case 9:
        dispatch(fetchArticles(true, false, 9));
        break;
      case 18:
        dispatch(fetchArticles(true, false, 18));
        break;
      default:
        break;
    }
  }

  onPress(article) {
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: WebViewContainer,
        name: 'WebViewPage',
        url: article.url,
        title: article.userName
      });
    });
  }

  renderItem(article, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={this.onPress.bind(this, article)}>
        <View style={styles.containerItem}>
          <Text style={styles.title}>
            {article.title}
          </Text>
        </View>
      </TouchableOpacity>
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
    let hotSource = this.state.dataSource.cloneWithRows(read.hotList);
    let itSource = this.state.dataSource.cloneWithRows(read.itList);
    let constellationSource = this.state.dataSource.cloneWithRows(read.constellationList);
    return (
      <View style={styles.container}>
        <ReadingToolbar
          title={'eading'}
          navigator={navigator}
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
    backgroundColor: '#fcfcfc',
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