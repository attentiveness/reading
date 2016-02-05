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
    codePush.sync({
      deploymentKey: "U7ZF2kYt5EzV14JyIB22SLRhQ2KBV1Ifekvul",
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '后台更新',
        optionalUpdateMessage: 'Reading有新版本了，是否更新？',
        title: '更新提示'
      },
      installMode: codePush.InstallMode.ON_NEXT_RESTART
    });
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
