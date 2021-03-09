import { store } from "@/index";

export class Header extends HTMLElement {
    static mtagName = "ee-header"
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

    }

    get name() {
        return this.getAttribute('name');
    }

    get age() {
        return this.getAttribute('age');
    }

    render(state) {
        return `
        <style>
            ul{
                list-style-type:none;
            }
            li{
                display:inline-block;
                color: #ffffff;
            }
        </style>
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
        // this.shadowRoot.querySelector('input').addEventListener('click',(e)=>{
        //     e.preventDefault();
        // });
        // bindEventsMethods(this);
        this.unsubscribe = store.subscribe(() => {
            let html = this.render(store.getState());
            if (this.html !== html) {
                this.html = html;
                this.shadowRoot.innerHTML = html;
            }
            this.afterViewChecked();
        });
        let html = this.render(store.getState());
            if (this.html !== html) {
                this.html = html;
                this.shadowRoot.innerHTML = html;
            }
            this.afterViewChecked();
    }
    disconnectedCallback() {
        this.unsubscribe();
    }

    static get observedAttributes() { return ['name', 'age']; }


    changeName($event, name, age) {
        this.setAttribute('name', name + 1);
    }
    changeAge($event, name, age) {
        this.setAttribute('age', age + 1);
    }

    attributeChangedCallback() {
       

    }
}
