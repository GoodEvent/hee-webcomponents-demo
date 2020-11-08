const tp = (instance) => `<style>
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
        <li (click)="u()"><a> 用户管理 </a>
        </li>
        <li (click)="s()"><a>系统管理</a></li>
    </ul>
</div>`;

class Sidebar extends HTMLElement {
    
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

    u(){
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

    attributeChangedCallback() {
        var shadow = this.shadowRoot;
        shadow.innerHTML = tp(this);
        if(this.querySelector('div')){
            this.querySelector('div').textContent = `${this.name}${this.age}`;
        }

    }
}

customElements.define('ee-sidebar',Sidebar);