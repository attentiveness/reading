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
import { bindActionCreators } from 'redux';
import * as categoryCreators from '../actions/category';

import Category from '../pages/Category';

class CategoryContainer extends React.Component {
  render() {
    return <Category {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  const { category } = state;
  return {
    category
  };
};

const mapDispatchToProps = (dispatch) => {
  const categoryActions = bindActionCreators(categoryCreators, dispatch);
  return {
    categoryActions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer);
