//window.React1 = require('react');
import React from 'react';
import { render } from 'react-dom';
import { appendIconDefinitions } from 'yarn-design-system-icons';
import { PersistGate } from 'redux-persist/integration/react';

import { initI18n, Provider as TranslationProvider } from './locales/i18n';
import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Routes from './routes';
import store, { persistor } from './stores/index';

import './styles/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
	const { t } = initI18n('en', 'yarn-test-page');
	const history = createBrowserHistory();

	appendIconDefinitions(document.body);
	render(
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Router history={history}>
					<Routes history={history}>
						<TranslationProvider value={t}></TranslationProvider>
					</Routes>
				</Router>
			</PersistGate>
		</Provider>,
		document.getElementById('root')
	);
});
