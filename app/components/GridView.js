/**
 *
 * Copyright 2015 reading
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
  View,
  StyleSheet,
  ListView
} from 'react-native';

const propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  style: PropTypes.func,
  itemsPerRow: PropTypes.number,
  onEndReached: PropTypes.func
};

class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.renderGroup = this.renderGroup.bind(this);
    this.groupItems = this.groupItems.bind(this);
  }

  groupItems(items, itemsPerRow) {
    const itemsGroups = [];
    let group = [];
    items.forEach((item) => {
      if (group.length === itemsPerRow) {
        itemsGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });
    if (group.length > 0) {
      itemsGroups.push(group);
    }
    return itemsGroups;
  }

  renderGroup(group) {
    const that = this;
    let items = group.map((item) => {
      const i = that.props.renderItem(item);
      return i;
    });
    return (
      <View style={styles.group}>
        {items}
      </View>
    );
  }

  render() {
    const groups = this.groupItems(this.props.items, this.props.itemsPerRow);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return (
      <ListView
        initialListSize={1}
        dataSource={ds.cloneWithRows(groups)}
        renderRow={this.renderGroup}
        style={this.props.style}
        onEndReached={this.props.onEndReached}
        scrollEnabled={this.props.scrollEnabled}
        pageSize={this.props.pageSize | 1}
        enableEmptySections
      />
    );
  }
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

GridView.propTypes = propTypes;

GridView.defaultProps = {
  items: [],
  renderItem: null,
  style: undefined,
  itemsPerRow: 1,
  onEndReached: undefined
};

export default GridView;
