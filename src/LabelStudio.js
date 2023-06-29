import { render, unmountComponentAtNode } from 'react-dom';
import App from './components/App/App';
import { configureStore } from './configureStore';
import { registerPanels } from './registerPanels';
import { configure } from 'mobx';
import { EventInvoker } from './utils/events';
import legacyEvents from './core/External';
import { toCamelCase } from 'strman';
import { isDefined } from './utils/utilities';
import { destroy } from 'mobx-state-tree';
import { destroy as destroySharedStore } from './mixins/SharedChoiceStore/mixin';
import { MultiProvider } from './providers/MultiProvider';
import { ApiProvider } from './providers/ApiProvider'

configure({
  isolateGlobalState: true,
});

export class LabelStudio {
  static instances = new Set();

  static destroyAll() {
    this.instances.forEach(inst => inst.destroy());
    this.instances.clear();
  }

  constructor(root, userOptions = {}) {
    this.root = root;
    this.events = new EventInvoker();
    this.options = userOptions ?? {};
    this.destroy = (() => { /* noop */ });

    this.supportLgacyEvents(userOptions);
    this.createApp();

    this.constructor.instances.add(this);
  }

  on(...args) {
    this.events.on(...args);
  }

  off(eventName, callback){
    if (isDefined(callback)) {
      this.events.off(eventName, callback);
    } else {
      this.events.removeAll(eventName);
    }
  }

  async createApp() {
    const { store, getRoot } = await configureStore(this.options, this.events);
    const rootElement = getRoot(this.root);

    this.store = store;
    window.Htx = this.store;

    render((
      <MultiProvider providers={[
        <ApiProvider key="api"/>,
      ]}>
        <App
          store={this.store}
          panels={registerPanels(this.options.panels) ?? []}
          />
      </MultiProvider>
    ), rootElement);

    const destructor = () => {
      unmountComponentAtNode(rootElement);
      destroySharedStore();
      destroy(this.store);
    };

    this.destroy = destructor;
  }

  supportLgacyEvents() {
    const keys = Object.keys(legacyEvents);

    keys.forEach(key => {
      const callback = this.options[key];

      if (isDefined(callback)) {
        const eventName = toCamelCase(key.replace(/^on/, ''));

        this.events.on(eventName, callback);
      }
    });
  }
}

