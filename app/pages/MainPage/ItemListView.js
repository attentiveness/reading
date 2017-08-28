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
import { StyleSheet, FlatList } from 'react-native';

const ItemListView = ({
  data,
  typeId,
  isRefreshing,
  onEndReached,
  onRefresh,
  renderItem,
  renderFooter,
  keyExtractor
}) =>
  (<FlatList
    initialNumToRender={6}
    style={styles.listView}
    data={data}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
    onEndReached={() => onEndReached(typeId)}
    onEndReachedThreshold={10}
    refreshing={isRefreshing}
    onRefresh={() => onRefresh(typeId)}
    ListFooterComponent={renderFooter}
  />);

const styles = StyleSheet.create({
  listView: {
    backgroundColor: '#eeeeec'
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  }
});

export default ItemListView;
