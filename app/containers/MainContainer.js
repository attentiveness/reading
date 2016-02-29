'use strict';

import React from 'react-native';
const {
  Component
} = React;
import {connect} from 'react-redux';
import CodePush from 'react-native-code-push';
import AV from 'avoscloud-sdk';
import Main from '../pages/Main';
import Storage from '../utils/Storage';

let typeIds = [0, 12, 9, 2];

class MainContainer extends Component {
  componentDidMount() {
    CodePush.sync({
      deploymentKey: "RGOUfyINiLicZnld67aD0nrbRvyLV1Ifekvul",
      updateDialog: {
        optionalIgnoreButtonLabel: '稍后',
        optionalInstallButtonLabel: '后台更新',
        optionalUpdateMessage: 'Reading有新版本了，是否更新？',
        title: '更新提示'
      },
      installMode: CodePush.InstallMode.ON_NEXT_RESTART
    });
    AV.initialize('Tfi1z7dN9sjMwSul8sYaTEvg-gzGzoHsz', '57qmeEJonefntNqRe17dAgi4');
    Storage.get('isInit')
      .then((isInit) => {
        if (!isInit) {
          Storage.save('typeIds', typeIds);
          Storage.save('isInit', true);
        }
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
