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
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

const EmptyView = ({ read, typeId, onRefresh }) => (
  <ScrollView
    automaticallyAdjustContentInsets={false}
    horizontal={false}
    contentContainerStyle={styles.no_data}
    style={styles.base}
    refreshControl={
      <RefreshControl
        style={styles.refreshControlBase}
        refreshing={read.isRefreshing}
        onRefresh={() => onRefresh(typeId)}
        title="Loading..."
        colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
      />
    }
  >
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 16 }}>目前没有数据，请刷新重试……</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  base: {
    flex: 1
  },
  no_data: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  refreshControlBase: {
    backgroundColor: 'transparent'
  }
});

export default EmptyView;
