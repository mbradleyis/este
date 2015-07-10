import './app.styl';
import Component from '../components/component.react';
import Footer from './footer.react';
import Header from './header.react';
import React from 'react';
import {RouteHandler} from 'react-router';
import dispatcher from '../state';
import {measureRender} from '../console';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState();
  }

  getState() {
    return dispatcher.state.toObject();
  }

  static childContextTypes = {
    dispatch: React.PropTypes.func
  }

  getChildContext() {
    return {
      dispatch: ::dispatcher.dispatch
    }
  }

  // Why componentWillMount instead of componentDidMount.
  // https://github.com/este/este/issues/274
  componentWillMount() {
    if (!process.env.IS_BROWSER) return;
    dispatcher.onChange = () => {
      measureRender(done => this.setState(this.getState(), done));
    };
  }

  render() {
    return (
      <div className="page">
        <Header />
        <RouteHandler {...this.state} />
        <Footer />
      </div>
    );
  }

}

export default App;
