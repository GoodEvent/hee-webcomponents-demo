import { store } from '.';
import { getUserThunk } from './redux';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ee-main')
export class Main extends LitElement {
  // static mtagName = "ee-main"
  unsubscribe;
  html: string;
  // constructor() {
  //     // 必须首先调用 super 方法
  //     super();
  //     const shadow = this.attachShadow({ mode: 'open' });
  // }

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

  render() {
    return html` <ee-route></ee-route> `;
  }

  login() {
    store.dispatch({ type: 'push', payload: '/login' });
  }

  layout() {
    store.dispatch({ type: 'push', payload: '/layout' });
  }

  afterViewChecked() {}

  //   connectedCallback() {
  //     this.unsubscribe = store.subscribe(() => {
  //       let html = this.render(store.getState());
  //       if (this.html !== html) {
  //         this.html = html;
  //         this.shadowRoot.innerHTML = html;
  //       }
  //       this.afterViewChecked();
  //     });
  //     let html = this.render(store.getState());
  //     if (this.html !== html) {
  //       this.html = html;
  //       this.shadowRoot.innerHTML = html;
  //     }
  //     this.afterViewChecked();
  //   }
  //   disconnectedCallback() {
  //     console.log('remove');
  //     this.unsubscribe();
  //   }
  search() {
    store.dispatch({ type: 'fetching' });
    setTimeout(() => {
      const a: any = getUserThunk();
      store.dispatch(a);
    }, 1000);
  }

  mfoo(event: Event) {
    event.stopPropagation();
  }

  mfather() {}

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

  attributeChangedCallback() {}
}
