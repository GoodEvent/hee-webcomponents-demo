import { store } from "@redux";
import styles from './ee-progress.scss';

export class Progress extends HTMLElement {
    static mtagName = "ee-progress"
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

    }

    render(state) {
        return `
        <div class="ee-progress">
        </div>
    `;
    }

    afterViewChecked() {
    }
    unsubscribe
    html
    connectedCallback() {
        this.unsubscribe = store.subscribe(() => {
            let html = this.render(store.getState());
            if (this.html !== html) {
                this.html = html;
                this.shadowRoot.innerHTML = html;
                const style = document.createElement('style');
                style.textContent = styles;
                this.shadowRoot.appendChild(style);
            }
            this.afterViewChecked();
        });
    }
    disconnectedCallback() {
        this.unsubscribe();
    }

    static get observedAttributes() { return ['name', 'age']; }


    attributeChangedCallback() {


    }
}
