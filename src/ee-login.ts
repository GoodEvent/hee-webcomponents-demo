import { getUserThunk, store } from "./redux";


export class Login extends HTMLElement {
    static mtagName = "ee-login"
    unsubscribe;
    html: string;
    constructor() {
        // 必须首先调用 super 方法
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        store.subscribe(()=>{
            let state = store.getState();
            shadow.innerHTML = this.render(state);
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
        login
        <button (click)="layout()">layout</button>
    `;

    }

    layout(){
        store.dispatch({type:'push',payload:'/layout'});
    }


    afterViewChecked() {
    }

    connectedCallback() {
        
    }
    disconnectedCallback() {
    }
    search() {
       

        // setTimeout(() => {
        //     store.dispatch({ type: 'set', payload: ['周润发', '梁朝伟'] });
        //     store.dispatch({ type: 'fetchend' });
        // },1000);
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
