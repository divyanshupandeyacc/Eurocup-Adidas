import { createContext } from 'react';
import i18next from 'i18next';

/**
 * Initialize translation configurations.
 *
 * @param {string} lng - ISO identifier of language to use.
 * @param {string} [namespace='translations'] - Name of the translations space.
 * @returns {{ i18n: Object, t: function }} Object with the internationalization instance and the translations function.
 */
export function initI18n(lng, namespace = 'translations') {
	const i18n = i18next.createInstance();

	i18n.init({
		resources: {
			[lng]: {
				[namespace]: require(`./${lng}.json`),
			},
			dev: {
				[namespace]: require('./dev.json'),
			},
		},
		lng,
		fallbackLng: 'dev',
		ns: namespace,
		defaultNS: namespace,
		joinArrays: '\n',
		interpolation: {
			format(value, format) {
				return format === 'uppercase'
					? value.toUpperCase()
					: format === 'lowercase'
					? value.toLowerCase()
					: format === 'capitalize'
					? `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`
					: value;
			},
		},
	});

	return {
		i18n,
		t: i18n.t.bind(i18n),
	};
}

export const I18nContext = createContext();

export const { Provider } = I18nContext;
