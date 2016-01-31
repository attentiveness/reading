'use strict';

import React from 'react-native';
const {
  Component
} = React;
import {connect} from 'react-redux';

import About from '../pages/About';

class AboutContainer extends Component {
  render() {
    return (
      <About {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {read} = state;
  return {
    read
  }
}

export default connect(mapStateToProps)(AboutContainer);