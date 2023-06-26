import { Component } from 'react';
import App from './components/App/App';
import { configureStore } from './configureStore';
import { registerPanels } from './registerPanels';
import { MultiProvider } from './providers/MultiProvider';
import { ApiProvider } from './providers/ApiProvider'

export class LabelStudio extends Component {
  state = {
    initialized: false,
  };

  componentDidMount() {
    configureStore(this.props).then(({ store }) => {
      this.store = store;
      window.Htx = this.store;
      this.setState({ initialized: true });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.task !== prevProps.task) {
      this.store.resetState();
      this.store.assignTask(this.props.task);
      this.store.initializeStore(this.props.task);
    }
  }

  render() {
    return this.state.initialized ? (
      <MultiProvider providers={[
        <ApiProvider key="api"/>,
      ]}>
        <App
          store={this.store}
          panels={registerPanels(this.props.panels) ?? []}
        />
      </MultiProvider>
    ) : null;
  }
}
