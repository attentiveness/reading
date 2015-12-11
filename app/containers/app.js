'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ListView,
  Text,
  View,
} = React;
var RefreshableListView = require('react-native-refreshable-listview')
var RequestService = require('../service/RequestService');
var LoadingView = require('../components/LoadingView');

var Request = new RequestService();

var WEXIN_ARTICLE_LIST = 'showapi_open_bus/weixin/weixin_article_list';

var App = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    Request.request(WEXIN_ARTICLE_LIST, 'get')
      .then((articleList) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(articleList.showapi_res_body.pagebean.contentlist),
          loaded: true,
          ds: articleList.showapi_res_body.pagebean.contentlist,
        });
      })
      .catch((error) => {
        this.setState({
          loaded: true,
        });
      })
  },

  render: function() {
    if (!this.state.loaded) {
      return <LoadingView/>;
    }
    if (this.state.ds == undefined || this.state.ds.length == 0) {
      return (
        <View style={ styles.no_data }>
          <Text style={ {fontSize: 16} }>没有数据</Text>
        </View>
      );
    }
    return (
      <RefreshableListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        loadData={this.fetchData}
        refreshDescription="Refreshing articles"
      />
    );
  },

  renderItem: function(article, sectionID, rowID) {
    return (
      <View style={ styles.container }>
          <Text style={ styles.title }>
                  { article.title }
          </Text>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeec',
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  title: {
    flex: 3,
    fontSize: 18,
    textAlign: 'left',
    color: '#aaaaaa',
  },
  listView: {
    backgroundColor: '#eeeeec',
  },
  no_data: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
});

module.exports = App;