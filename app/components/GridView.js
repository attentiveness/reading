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
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ListView, ViewPropTypes } from 'react-native';

const propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  style: ViewPropTypes.style,
  itemsPerRow: PropTypes.number,
  onEndReached: PropTypes.func,
  scrollEnabled: PropTypes.func,
  pageSize: PropTypes.number
};

const GridView = ({
  items,
  renderItem,
  style,
  itemsPerRow,
  onEndReached,
  scrollEnabled,
  pageSize
}) => {
  const groupItems = (renderItems, renderItemsPerRow) => {
    const itemsGroups = [];
    let group = [];
    renderItems.forEach((item) => {
      if (group.length === renderItemsPerRow) {
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
  };

  const renderGroup = (group) => {
    const itemViews = group.map((item) => {
      const i = renderItem(item);
      return i;
    });
    return <View style={styles.group}>{itemViews}</View>;
  };

  const groups = groupItems(items, itemsPerRow);

  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  return (
    <ListView
      initialListSize={1}
      dataSource={ds.cloneWithRows(groups)}
      renderRow={renderGroup}
      style={style}
      onEndReached={onEndReached}
      scrollEnabled={scrollEnabled}
      pageSize={pageSize || 1}
      enableEmptySections
    />
  );
};

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
