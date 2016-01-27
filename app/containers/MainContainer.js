import React from 'react-native';
const {
  View,
  Component
} = React;
import {connect} from 'react-redux';

import Main from '../pages/Main';

class MainContainer extends Component {
  render() {
    return (
      <Main {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const {read} = state;
  return {
    read
  }
}

export default connect(mapStateToProps)(MainContainer);
