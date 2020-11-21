import { store, getUserThunk } from "../redux";


export class Blank extends HTMLElement {
    static mtagName = "ee-blank"
    unsubscribe;
    html: string;
    constructor() {
        // 必须首先调用 super 方法
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.unsubscribe = store.subscribe(() => {
            let html = this.render(store.getState());
            if (this.html !== html) {
                this.html = html;
                this.shadowRoot.innerHTML = html;
            }
            this.afterViewChecked();
        });
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

    render(state: { users: [], loading: boolean }) {
        return `
        <button (click)="search()">search</button>
        <button (click)="login()">login</button>
        ${state.loading ?
                `<div> loading </div>`
                :
                state.users.reduce((pre, current) => {
                    return `${pre}<div>${current}</div>`;
                }, '')}
    `;

    }

    login(){
        store.dispatch({type:'push',payload:'/login'});
    }

    layout(){
        store.dispatch({type:'push',payload:'/layout'});

    }

    afterViewChecked() {
    }

    connectedCallback() {
        this.search();
    }
    disconnectedCallback() {
        console.log('remove')
        this.unsubscribe();
    }
    search() {
        store.dispatch({ type: 'fetching' });
        setTimeout(() => {
            store.dispatch(getUserThunk());
        }, 1000)
    }


    mfoo(event: Event) {
        event.stopPropagation();
    }

    mfather() {
    }

    checkbox(e: Event) {
        e.preventDefault();
    }

    // static get observedAttributes() { return Object.keys(store.state); }


    changeName($event, name, age) {
        this.setAttribute('name', name + 1);
    }
    changeAge($event, name, age) {
        this.setAttribute('age', age + 1);
    }

    attributeChangedCallback() {

    }
}
