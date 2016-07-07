import React from 'react';
import { connect } from 'react-redux';

import Category from '../pages/Category';

class CategoryContainer extends React.Component {
  render() {
    return (
      <Category {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { category } = state;
  return {
    category
  };
}

export default connect(mapStateToProps)(CategoryContainer);
