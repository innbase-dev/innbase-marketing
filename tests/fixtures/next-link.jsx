import React from 'react';

export default function Link({ href, children, onClick, ...props }) {
  return <a href={href} {...props} onClick={event => {
    onClick?.(event);
    if (!event.defaultPrevented && href.startsWith('/refer/portal') && !event.metaKey && !event.ctrlKey) {
      event.preventDefault(); history.pushState({}, '', href); dispatchEvent(new PopStateEvent('popstate'));
    }
  }}>{children}</a>;
}
