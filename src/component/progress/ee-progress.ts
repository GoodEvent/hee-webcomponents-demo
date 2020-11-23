import { store } from "@redux";

export class Header extends HTMLElement {
    static mtagName = "ee-header"
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

    }

    render(state) {
        return `
        <div>
        <ul>
            <li>
            <a>
            notification
            </a>
            </li>
        </ul>
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
