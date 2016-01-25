'use strict';

import React from 'react-native';
const {
  StyleSheet,
  ListView,
  RefreshControl,
  ScrollView,
  Text,
  View
} = React;
import LoadingView from '../components/LoadingView';
import {request} from '../utils/RequestUtils';

var WEXIN_ARTICLE_LIST = 'showapi_open_bus/weixin/weixin_article_list';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false
    };
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  onRefresh() {
    this.setState({
      isRefreshing: true
    });
    this.fetchData();
  }

  fetchData() {
    request(WEXIN_ARTICLE_LIST, 'get')
      .then((articleList) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(articleList.showapi_res_body.pagebean.contentlist),
          loaded: true,
          ds: articleList.showapi_res_body.pagebean.contentlist,
          isRefreshing: false
        });
      })
      .catch((error) => {
        this.setState({
          loaded: true
        });
      })
  }

  renderItem(article, sectionID, rowID) {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>
          { article.title }
        </Text>
      </View>
    )
  }

  render() {
    if (!this.state.loaded) {
      return <LoadingView/>;
    }
    if (this.state.ds == undefined || this.state.ds.length == 0) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}
          horizontal={false}
          contentContainerStyle={styles.no_data}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              title="Loading..."
              colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
            />
          }
        >
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 16}}>
              目前没有数据
            </Text>
          </View>
        </ScrollView>
      );
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        style={styles.listView}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            title="Loading..."
            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
          />
        }
      />
    );
  }
}

let styles = StyleSheet.create({
  container: {
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

export default App;