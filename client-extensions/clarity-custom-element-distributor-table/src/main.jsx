import React, { StrictMode } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import App from './App.jsx'
import './index.css'

class WebComponent extends HTMLElement {
	
	connectedCallback() {
		render(
			<StrictMode>
				<App />
			</StrictMode>,
			this
		);
	}

	disconnectedCallback() {
		unmountComponentAtNode(this);
	}
}

const ELEMENT_ID = 'clarity-custom-element-distributor-table';

if (!customElements.get(ELEMENT_ID)) {
	customElements.define(ELEMENT_ID, WebComponent);
}
