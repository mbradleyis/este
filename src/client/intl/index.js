import IntlMessageFormat from 'intl-messageformat';
import IntlRelativeFormat from 'intl-relativeformat';
import i18n from '../i18n'
import {List, Map} from 'immutable';

const locale = 'en';
const cachedInstances = Object.create(null);
const intlRelativeFormat = new IntlRelativeFormat;

function getCachedInstanceOf(message) {
  if (message in cachedInstances)
    return cachedInstances[message];
  // TODO: Add locales support.
  cachedInstances[message] = new IntlMessageFormat(message);
  return cachedInstances[message];
}

export function msg(path, values = null): string {
  const pathParts = [locale].concat(path.split('.'));
  const message = i18n.getIn(pathParts);

  if (message == null)
    throw new ReferenceError('Could not find Intl message: ' + path);

  return !values ? message : getCachedInstanceOf(message).format(values);
}

// get List[.slice(start[, end])] of message Maps like [{key: message_key, txt: message_text}, ...]
export function msgs(path, values = null, ...sliceParams): List<Map> {
  const pathParts = [locale].concat(path.split('.'));
  const messages = i18n.getIn(pathParts);

  if (messages == null)
    throw new ReferenceError('Could not find Intl messages: ' + path);
  if (!List.isList(messages))
    throw new ReferenceError('Not a List of Intl messages: ' + path);

  const messageList = !sliceParams ? messages : List.prototype.slice.apply(messages, sliceParams);

  return !values ? messageList : messageList.map((item) =>
    item.merge(Map({
      txt: getCachedInstanceOf(item.get('txt')).format(values)
    })));
}

export function relativeDateFormat(date, options?): string {
  return intlRelativeFormat.format(date, options);
}

export function dateFormat(date, locales?, options?): string {
  const dateTimeFormat = new Intl.DateTimeFormat(locales, options);
  return dateTimeFormat.format(date);
}
