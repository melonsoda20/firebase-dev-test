import components from '../components';

async function update(path, history = false) {
  if (!history) {
    window.history.pushState(path, false, path);
  }
  const { callback = () => {} } = components.find(component => component.path === path);
  await callback(update);
}

function initialize() {
  window.onpopstate = event => {
    if (event && event.state) {
      update(event.state, true);
    }
  };
}

export { update, initialize };