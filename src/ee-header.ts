// import { store } from "@/index";
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("ee-header")
export class Header extends LitElement {
  // static mtagName = "ee-header"
  // constructor() {
  //     super();
  //     const shadow = this.attachShadow({ mode: 'open' });

  // }
  static styles = css`
    ul {
      list-style-type: none;
    }
    li {
      display: inline-block;
      color: #ffffff;
    }
  `;
  // get name() {
  //     return this.getAttribute('name');
  // }

  // get age() {
  //     return this.getAttribute('age');
  // }

  @state()
  protected username = 'luoxiao';

  render() {
    return html`
      <div>
        <ul>
          <li>
            <a> notification </a>
          </li>
          <li (click)="change()">
            <a> ${this.username} </a>
          </li>
        </ul>
      </div>
    `;
  }

  change(){
      this.username += 1;
  }

  // afterViewChecked() {
  // }
  // unsubscribe
  // html
  // connectedCallback() {
  //     // this.shadowRoot.querySelector('input').addEventListener('click',(e)=>{
  //     //     e.preventDefault();
  //     // });
  //     // bindEventsMethods(this);
  //     // this.unsubscribe = store.subscribe(() => {
  //     //     let html = this.render(store.getState());
  //     //     if (this.html !== html) {
  //     //         this.html = html;
  //     //         this.shadowRoot.innerHTML = html;
  //     //     }
  //     //     this.afterViewChecked();
  //     // });
  //     // let html = this.render(store.getState());
  //     //     if (this.html !== html) {
  //     //         this.html = html;
  //     //         this.shadowRoot.innerHTML = html;
  //     //     }
  //     //     this.afterViewChecked();
  // }
  // disconnectedCallback() {
  //     // this.unsubscribe();
  // }

  // static get observedAttributes() { return ['name', 'age']; }

  // changeName($event, name, age) {
  //     this.setAttribute('name', name + 1);
  // }
  // changeAge($event, name, age) {
  //     this.setAttribute('age', age + 1);
  // }

  // attributeChangedCallback() {

  // }
}
