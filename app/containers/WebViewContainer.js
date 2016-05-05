'use strict';

import React from 'react';
import {connect} from 'react-redux';

import WebViewPage from '../pages/WebViewPage';

class WebViewContainer extends React.Component {
  render() {
    return (
      <WebViewPage {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {read} = state;
  return {
    read
  };
}

export default connect(mapStateToProps)(WebViewContainer);
