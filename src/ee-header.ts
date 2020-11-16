import { store } from "./redux";

export class Header extends HTMLElement {
    static mtagName = "ee-header"
    constructor() {
        // 必须首先调用 super 方法
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
            我的消息
            </a>
            </li>
            <li>
            <a>
            ${state.name}
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
