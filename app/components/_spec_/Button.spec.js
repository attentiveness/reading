'use strict';

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Button from '../Button';

describe('<Button />', () => {
  it('it should render 1 Text component', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find(Text)).to.have.length(1);
  });

});