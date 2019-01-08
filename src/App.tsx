import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from "react-apollo";
import Root from './components/Root';
import client from './data/Client';
import configureStore from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Root />
          </ApolloProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
