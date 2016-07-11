/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import CodePush from 'react-native-code-push';
import AV from 'avoscloud-sdk';
import Main from '../pages/Main';
import Storage from '../utils/Storage';

const typeIds = [0, 12, 9, 2];

class MainContainer extends React.Component {
  componentDidMount() {
    CodePush.sync({
      deploymentKey: 'RGOUfyINiLicZnld67aD0nrbRvyLV1Ifekvul',
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
  const { read } = state;
  return {
    read
  };
}

export default connect(mapStateToProps)(MainContainer);
