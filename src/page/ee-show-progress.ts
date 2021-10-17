import { store } from '..';
import { getUserThunk } from '../redux';
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
@customElement('ee-show-progress')
export class ShowProgress extends LitElement {
  //   static mtagName = 'ee-show-progress';
  unsubscribe;
  html: string;
  //   constructor() {
  //     // 必须首先调用 super 方法
  //     super();
  //     const shadow = this.attachShadow({ mode: 'open' });
  //     this.unsubscribe = store.subscribe(() => {
  //       let html = this.render(store.getState());
  //       if (this.html !== html) {
  //         this.html = html;
  //         this.shadowRoot.innerHTML = html;
  //       }
  //       this.afterViewChecked();
  //     });
  //   }

  render() {
    return html`
      <div style="width:100px;margin:10px"><ee-progress></ee-progress></div>
    `;
  }

  //   afterViewChecked() {}

  //   connectedCallback() {}
  //   disconnectedCallback() {
  //     this.unsubscribe();
  //   }

  //   attributeChangedCallback() {}
}
