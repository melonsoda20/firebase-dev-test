import { html } from 'uhtml';
import components from '../components';

export default update => html`
<nav>
  <ul>
    ${ components.map(({ label, path }) => html.for({ label, path })`
      <li><a onclick="${ () => update(path) }" class=${window.location.pathname == path ? "a-active" : ""}>${ label }</li>
    `) }
  </ul>
</nav>
`;