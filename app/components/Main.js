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
import ReadingTabBar from './ReadingTabBar';
import ReadingToolbar from './ReadingToolbar';

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
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchArticles(false, true));
  }

  onRefresh() {
    const {dispatch} = this.props;
    dispatch(fetchArticles(true, false));
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

  renderContent() {
    const {read} = this.props;
    if (read.loading) {
      return <LoadingView/>;
    }
    if (read.articleList == undefined || read.articleList.length == 0) {
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
              目前没有数据
            </Text>
          </View>
        </ScrollView>
      );
    }
    let dataSource = this.state.dataSource.cloneWithRows(read.articleList);
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
    return (
      <View style={styles.container}>
        <ReadingToolbar
          actions={toolbarActions}
          onActionSelected={this.onActionSelected}
          title={'Reading'}
        />
        {this.renderContent()}
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