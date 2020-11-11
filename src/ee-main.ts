const tp = (instance) => `
<div (click)="mfather()">
<div (click)="mfoo($event)">foo</div>
<input (click)="checkbox($event)" type="checkbox" />   
</div>

`;

class Main extends HTMLElement {

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
        // this.shadowRoot.querySelector('input').addEventListener('click',(e)=>{
        //     e.preventDefault();
        // });
        // bindEventsMethods(this);
    }

    mfoo(event: Event) {
        console.log(event)
        event.stopPropagation();
        console.log('mfoo');
    }

    mfather() {
        console.log('mfather');
    }

    checkbox(e:Event){
        console.log('checkbox');
        e.preventDefault();
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
        if (this.querySelector('div')) {
            this.querySelector('div').textContent = `${this.name}${this.age}`;
        }

    }
}

customElements.define('ee-main', Main);