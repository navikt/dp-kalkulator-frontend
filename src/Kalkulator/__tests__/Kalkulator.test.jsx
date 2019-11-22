import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { instance } from '../../Api';
import { Kalkulator } from '../Kalkulator';
import LoadingMessage from '../../Components/LoadingMessage';
import mockInnsyn from '../../../public/__mocks__/mockInnsyn.json';

const mock = new MockAdapter(instance);

describe('Kalkulator', () => {
  it('Skal vise laster siden', () => {
    const wrapper = shallow(<Kalkulator />);
    const loadingMessage = wrapper.find(LoadingMessage);
    expect(loadingMessage).to.have.length(1);
  });

  it('Skal vise kalkulator med resultat', async () => {
    mock.onGet('/behov').reply(200, mockInnsyn);

    const wrapper = await mount(<Kalkulator />);
    const loadingMessage = wrapper.find(LoadingMessage);
    console.log(wrapper.debug());
    expect(loadingMessage).to.have.length(1);
  });
});
