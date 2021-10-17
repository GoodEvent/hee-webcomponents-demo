import { store } from '@/index';
import styles from './ee-progress.scss';
import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
@customElement('ee-progress')
export class Progress extends LitElement {
  //   static mtagName = 'ee-progress';
  //   constructor() {
  //     super();
  //     const shadow = this.attachShadow({ mode: 'open' });
  //   }
  static styles = unsafeCSS(styles);
  render() {
    return html`
      <div class="ee-progress">
        <div class="ee-progress-bar" style="width:30%"></div>
      </div>
    `;
  }

  //   afterViewChecked() {}
  unsubscribe;
  html;
  //   connectedCallback() {
  //     this.unsubscribe = store.subscribe(() => {
  //       let html = this.render(store.getState());
  //       if (this.html !== html) {
  //         this.html = html;
  //         this.shadowRoot.innerHTML = html;
  //         const style = document.createElement('style');
  //         style.textContent = styles;
  //         this.shadowRoot.appendChild(style);
  //       }
  //       this.afterViewChecked();
  //     });
  //   }
  //   disconnectedCallback() {
  //     this.unsubscribe();
  //   }

  //   static get observedAttributes() {
  //     return ['name', 'age'];
  //   }

  //   attributeChangedCallback() {}
}
