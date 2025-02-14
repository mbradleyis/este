import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {Link} from 'react-router';
import {FormattedHTMLMessage} from 'react-intl';
import {msg} from '../intl';

class Home extends Component {

  render() {
    return (
      <DocumentTitle title={msg('pages.home.title')}>
        <div className="home-page">
          <p>
            <FormattedHTMLMessage message={msg('pages.home.infoHtml')} />{' '}
            <Link to="todos">{msg('pages.home.todos')}</Link>.
          </p>
        </div>
      </DocumentTitle>
    );
  }

}

export default Home;
