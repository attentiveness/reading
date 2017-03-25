/**
 *
 * Copyright 2015-present reading
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
import { StyleSheet, Navigator } from 'react-native';

import { registerApp } from 'react-native-wechat';
import AV from 'leancloud-storage';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Splash from '../pages/Splash';
import CategoryContainer from '../containers/CategoryContainer';
import MainContainer from '../containers/MainContainer';
import WebViewPage from '../pages/WebViewPage';
import Feedback from '../pages/Feedback';
import About from '../pages/About';
import TabIcon from '../components/TabIcon';

const RouterWithRedux = connect()(Router);
const backButton = require('../img/arrow_left.png');

const getSceneStyle = (props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar
      ? 0
      : Navigator.NavigationBar.Styles.General.TotalNavHeight;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

class App extends React.Component {
  componentDidMount() {
    registerApp('wxb24c445773822c79');
    AV.init({
      appId: 'Tfi1z7dN9sjMwSul8sYaTEvg-gzGzoHsz',
      appKey: '57qmeEJonefntNqRe17dAgi4'
    });
  }

  render() {
    return (
      <RouterWithRedux
        getSceneStyle={getSceneStyle}
        navigationBarStyle={styles.navBar}
        titleStyle={styles.navBarTitle}
        backButtonImage={backButton}
      >
        <Scene key="root">
          <Scene
            key="splash"
            component={Splash}
            hideNavBar
            hideTabBar
            initial
          />
          <Scene
            key="initCategory"
            component={CategoryContainer}
            hideNavBar
            hideTabBar
            type={ActionConst.REPLACE}
          />
          <Scene
            key="tabbar"
            tabs
            pressOpacity={0.8}
            type={ActionConst.REPLACE}
          >
            <Scene
              key="main"
              component={MainContainer}
              hideNavBar
              title="阅读"
              icon={TabIcon}
              iconName="md-home"
            />
            <Scene
              key="category"
              component={CategoryContainer}
              title="分类"
              icon={TabIcon}
              iconName="md-pricetags"
            />
            <Scene
              key="feedback"
              component={Feedback}
              title="建议"
              icon={TabIcon}
              iconName="md-thumbs-up"
            />
            <Scene
              key="about"
              component={About}
              title="关于"
              icon={TabIcon}
              iconName="md-information-circle"
            />
          </Scene>
          <Scene key="web" hideTabBar component={WebViewPage} />
        </Scene>
      </RouterWithRedux>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#3e9ce9'
  },
  navBarTitle: {
    color: '#fff',
    fontSize: 20
  }
});

export default App;
