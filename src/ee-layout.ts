import { store } from "@redux";

const tp = (instance) => `
<style>
    div.layout{
        display:flex;
        flex-direction: row;
    }
    ee-sidebar {
        min-height: 100vh;
        width: 161px;
        background:black;
    }
    div.content{
        flex-grow: 1;
        display:flex;
        flex-direction: column;
    }

    
    ee-header{
        background:#4c8cdcde;
    }
    ee-main{
        flex-grow: 1;
    }
</style>
<div class="layout" (click,true)="fff($event)">
<ee-sidebar></ee-sidebar>
<div class="content">
<ee-header></ee-header>
<ee-main></ee-main>
</div>

</div>

`;

export class Layout extends HTMLElement {
    static mtagName = 'ee-layout';
    fff(e:Event){
        // e.stopPropagation();
    }
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
       
    }


    get observedAttributes() { return ['name', 'age']; }


    changeName($event, name, age) {
        this.setAttribute('name', name + 1);
    }
    changeAge($event, name, age) {
        this.setAttribute('age', age + 1);
    }

    attributeChangedCallback() {
        // var shadow = this.shadowRoot;
        // shadow.innerHTML = tp(this);
        // if(this.querySelector('div')){
        //     this.querySelector('div').textContent = `${this.name}${this.age}`;
        // }

    }
}
