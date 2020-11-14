import { store } from "./redux";


class Main extends HTMLElement {
    unsubscribe;
    html: string;
    constructor() {
        // 必须首先调用 super 方法
        super();
        let state = store.state;
        let keys = Object.keys(state);
        keys.forEach(key => {
            this.setAttribute(key, state[key]);
        });
        const shadow = this.attachShadow({ mode: 'open' });
    }

    get name() {
        return this.getAttribute('name');
    }

    get age() {
        return this.getAttribute('age');
    }

    add() {
        store.dispatch({ type: 'add' });
    }
    add1() {
        store.dispatch({ type: 'add1' });
    }

    render(state) {
      return `
    <div (click)="mfather()">
<div (click)="mfoo($event)">foo</div>
<input (click,true)="checkbox($event)" type="checkbox" />   
<button (click)="add()">${state.count}</button>
<button (click)="add1()">${state.count}</button>
</div>

`;

    }

    afterViewChecked() {
        console.log('afterViewChecked')
    }

    connectedCallback() {
        // this.shadowRoot.querySelector('input').addEventListener('click',(e)=>{
        //     e.preventDefault();
        // });
        // bindEventsMethods(this);
        this.unsubscribe = store.subscribe(state => {
            console.log(this);
            let html = this.render(state);
            if (this.html !== html) {
                console.log('render');
                this.html = html;
                this.shadowRoot.innerHTML = html;
            }
            this.afterViewChecked();
        });
    }
    disconnectedCallback() {
        this.unsubscribe();
    }
    mfoo(event: Event) {
        console.log(event)
        event.stopPropagation();
        console.log('mfoo');
    }

    mfather() {
        console.log('mfather');
    }

    checkbox(e: Event) {
        console.log('checkbox');
        e.preventDefault();
    }

    static get observedAttributes() { return Object.keys(store.state); }


    changeName($event, name, age) {
        this.setAttribute('name', name + 1);
    }
    changeAge($event, name, age) {
        this.setAttribute('age', age + 1);
    }

    attributeChangedCallback() {
       
    }
}

customElements.define('ee-main', Main);