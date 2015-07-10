import Component from '../components/component.react';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';
import {msg} from '../intl';

class Header extends Component {

  render() {

    return (
      <header>
        <h1>
          <FormattedHTMLMessage message={msg('app.header.h1Html')} />
        </h1>
        <ul>
          <li><Link to="home">{msg('app.header.home')}</Link></li>
          <li><Link to="todos">{msg('app.header.todos')}</Link></li>
        </ul>
      </header>
    );
  }

}

export default Header;
