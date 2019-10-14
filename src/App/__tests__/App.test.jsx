import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Suspense fallback={<div>loading...</div>}>
        <App />
      </Suspense>,
      div,
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Skal vise samtykke', () => {});

  it('Skal vise kalkulator', () => {});
});
