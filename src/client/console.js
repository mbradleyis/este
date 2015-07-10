import dispatcher from './state';

const isBrowser = process.env.IS_BROWSER;

export function measureRender(callback) {
  const measureRenderEnabled = isBrowser && window.este.measureRender;
  if (measureRenderEnabled)
    console.time('app render'); // eslint-disable-line no-console
  callback(() => {
    if (measureRenderEnabled)
      console.timeEnd('app render'); // eslint-disable-line no-console
  });
}

if (isBrowser) {
  window.este = {
    measureRender: false,
    dispatcher: dispatcher
  };
}
