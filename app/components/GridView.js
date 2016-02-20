'use strict';

import React from 'react-native';
const {
  AppRegistry,
  View,
  StyleSheet,
  ListView,
  PropTypes
} = React;

const propTypes = {
	items: PropTypes.array,
	renderItem: PropTypes.func,
	style: PropTypes.func,
	itemsPerRow: PropTypes.number,
	onEndReached: PropTypes.func
}

class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.renderGroup = this.renderGroup.bind(this);
    this.groupItems = this.groupItems.bind(this);
  }

	groupItems(items, itemsPerRow) {
		var itemsGroups = [];
		var group = [];
		items.forEach(function(item) {
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
		var that = this;
		var items = group.map(function(item) {
			return that.props.renderItem(item);
		});
		return (
			<View style={styles.group}>
        {items}
      </View>
		);
	}

	render() {
		var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		return (
			<ListView
      	dataSource={ds.cloneWithRows(groups)}
        renderRow={this.renderGroup}
        style={this.props.style}
        onEndReached={this.props.onEndReached}
        scrollEnabled={this.props.scrollEnabled}
        pageSize={this.props.pageSize | 1}
      />
    );
	}
};

let styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})

GridView.propTypes = propTypes;

GridView.defaultProps = {
	items: [],
	renderItem: null,
	style: undefined,
	itemsPerRow: 1,
	onEndReached: undefined
}

export default GridView;