'use strict';

import React from 'react';
import {connect} from 'react-redux';

import Feedback from '../pages/Feedback';

class FeedbackContainer extends React.Component {
  render() {
    return (
      <Feedback {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {read} = state;
  return {
    read
  };
}

export default connect(mapStateToProps)(FeedbackContainer);