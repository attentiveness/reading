'use strict';

import React from 'react-native';
const {
  Component
} = React;
import {connect} from 'react-redux';

import Category from '../pages/Category';

class CategoryContainer extends Component {
  render() {
    return (
      <Category {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {category} = state;
  return {
    category
  }
}

export default connect(mapStateToProps)(CategoryContainer);