import { store } from "@/index";

export class Card extends HTMLElement{
    static mtagName = 'ee-card';
    html: string;
    unsubscribe
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
    }
    disconnectedCallback() {
        this.unsubscribe();
    }
    mfoo(event: Event) {
        event.stopPropagation();
    }

    mfather() {
    }

    checkbox(e: Event) {
        e.preventDefault();
    }

}