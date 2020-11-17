import { getUserThunk, store } from "./redux";


export class Main extends HTMLElement {
    static mtagName = "ee-main"
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
        <button (click)="push()">push</button>
        <button (click)="replace()">replace</button>
        <button (click)="search()">search</button>
        ${state.loading ?
                `<div> loading </div>`
                :
                state.users.reduce((pre, current) => {
                    return `${pre}<div>${current}</div>`;
                }, '')}
    `;

    }

    push(){
        store.dispatch({type:'push',payload:'http://localhost:8080/push'});
    }

    replace(){
        store.dispatch({type:'replace',payload:'http://localhost:8080/replace'});

    }

    afterViewChecked() {
    }

    connectedCallback() {
        console.log('ffff')
        this.search();
    }
    disconnectedCallback() {
        this.unsubscribe();
    }
    search() {
        store.dispatch({ type: 'fetching' });
        setTimeout(() => {
            store.dispatch(getUserThunk());
        }, 1000)

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
