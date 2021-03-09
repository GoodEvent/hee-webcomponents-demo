import { store } from "@/index";



export class Sidebar extends HTMLElement {
    static mtagName = "ee-sidebar"
    constructor() {
        // 必须首先调用 super 方法
        super();
        console.log('sidabar')
        const shadow = this.attachShadow({ mode: 'open' });
    }

    get name() {
        return this.getAttribute('name');
    }

    get age() {
        return this.getAttribute('age');
    }

    render(state) {
       return `<style>
    ul {
        list-style-type: none;
        margin: 0;
    }

    li {
        height:40px;
        line-height: 40px;
        margin: 0;
        color: #ffffff;
    }
    .logo{
        height:67px;
    }

</style>
<div>
    <div class="logo">logo</div>
    <ul>
        <li (click)="toblank()"><a> blank </a>
        </li>
        <li (click)="tosearch()"><a>search</a></li>
        <li (click)="toprogress()"><a>progress</a></li>
        <li (click)="totree()"><a>tree</a></li>
    </ul>
</div>`;

    }

    afterViewChecked() {
    }
    unsubscribe
    html

    toblank(){
        store.dispatch({type:'push',payload:'/layout/blank'});
    }
    tosearch(){
        store.dispatch({type:'push',payload:'/layout/search'});
    }
    toprogress(){
        store.dispatch({type:'push',payload:'/layout/show-progress'});
    }
    totree(){
        store.dispatch({type:'push',payload:'/layout/tree'});
    }
    connectedCallback() {
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

    u(){
        // store.dispatch({type:'add'});
    }

    s(){
    }

    static get observedAttributes() { return ['name', 'age']; }


    changeName($event, name, age) {
        this.setAttribute('name', name + 1);
    }
    changeAge($event, name, age) {
        this.setAttribute('age', age + 1);
    }
}