const tp = (instance) => `

`;

class Router extends HTMLElement {
    
    constructor() {
        // 必须首先调用 super 方法
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = tp(this);
    }

    get name() {
        return this.getAttribute('name');
    }

    get age() {
        return this.getAttribute('age');
    }

    connectedCallback() {
        // bindEventsMethods(this);
    }

    static get observedAttributes() { return ['name', 'age']; }


    changeName($event, name, age) {
        this.setAttribute('name', name + 1);
    }
    changeAge($event, name, age) {
        this.setAttribute('age', age + 1);
    }

    attributeChangedCallback() {
        var shadow = this.shadowRoot;
        shadow.innerHTML = tp(this);
        if(this.querySelector('div')){
            this.querySelector('div').textContent = `${this.name}${this.age}`;
        }

    }
}

customElements.define('ee-router',Router);