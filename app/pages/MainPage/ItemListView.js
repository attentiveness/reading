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
import { ListView, RefreshControl, StyleSheet } from 'react-native';

const ItemListView = ({
  dataSource,
  typeId,
  isRefreshing,
  onEndReached,
  onRefresh,
  renderItem,
  renderFooter
}) => (
  <ListView
    initialListSize={1}
    dataSource={dataSource}
    renderRow={renderItem}
    style={styles.listView}
    onEndReached={() => onEndReached(typeId)}
    onEndReachedThreshold={10}
    renderFooter={renderFooter}
    refreshControl={
      <RefreshControl
        style={styles.refreshControlBase}
        refreshing={isRefreshing}
        onRefresh={() => onRefresh(typeId)}
        title="Loading..."
        colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
      />
    }
  />
);

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#eeeeec'
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  }
});

export default ItemListView;
