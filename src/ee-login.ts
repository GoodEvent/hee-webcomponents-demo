import { store } from '.';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('ee-login')
export class Login extends LitElement {
  // static mtagName = "ee-login"
  unsubscribe;
  html: string;
  //   constructor() {
  //     // 必须首先调用 super 方法
  //     super();
  //     const shadow = this.attachShadow({ mode: 'open' });
  //   }

  //   get name() {
  //     return this.getAttribute('name');
  //   }

  //   get age() {
  //     return this.getAttribute('age');
  //   }

  add() {
    store.dispatch({ type: 'add' });
  }
  add1() {
    store.dispatch({ type: 'add1' });
  }

  render() {
    return html`
      login
      <button (click)="layout()">layout</button>
    `;
  }

  layout() {
    store.dispatch({ type: 'push', payload: '/layout/search' });
  }

  //   afterViewChecked() {}

  //   connectedCallback() {
  //     this.unsubscribe = store.subscribe(() => {
  //       let state = store.getState();
  //       this.shadowRoot.innerHTML = this.render(state);
  //     });
  //   }
  //   disconnectedCallback() {
  //     this.unsubscribe();
  //   }
  search() {
    // setTimeout(() => {
    //     store.dispatch({ type: 'set', payload: ['周润发', '梁朝伟'] });
    //     store.dispatch({ type: 'fetchend' });
    // },1000);
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

  //   attributeChangedCallback() {}
}
