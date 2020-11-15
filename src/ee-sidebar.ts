import { store } from "./redux";



export class Sidebar extends HTMLElement {
    static mtagName = "ee-sidebar"
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
        <li (click)="u()"><a> ${state.count}管理 </a>
        </li>
        <li (click)="s()"><a>系统管理</a></li>
    </ul>
</div>`;

    }

    afterViewChecked() {
        console.log('afterViewChecked')
    }
    unsubscribe
    html
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

    u(){
        store.dispatch({type:'add'});
        console.log('u');
    }

    s(){
        console.log('s');
    }

    static get observedAttributes() { return ['name', 'age']; }


    changeName($event, name, age) {
        this.setAttribute('name', name + 1);
    }
    changeAge($event, name, age) {
        this.setAttribute('age', age + 1);
    }
}