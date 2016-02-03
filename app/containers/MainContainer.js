'use strict';

import React from 'react-native';
const {
  Component
} = React;
import {connect} from 'react-redux';
import codePush from "react-native-code-push";
import Main from '../pages/Main';

class MainContainer extends Component {
  componentDidMount() {
    codePush.sync({updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE});
  }

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
