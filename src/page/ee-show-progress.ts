import { store } from "..";
import { getUserThunk } from "../redux";


export class ShowProgress extends HTMLElement {
    static mtagName = "ee-show-progress"
    unsubscribe;
    html: string;
    constructor() {
        // 必须首先调用 super 方法
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.unsubscribe = store.subscribe(() => {
            let html = this.render(store.getState());
            if (this.html !== html) {
                this.html = html;
                this.shadowRoot.innerHTML = html;
            }
            this.afterViewChecked();
        });
    }


    render(state: { users: [], loading: boolean }) {
        return `
            <div style="width:100px;margin:10px">   <ee-progress></ee-progress>
            </div>
         
        `;

    }



    afterViewChecked() {
    }

    connectedCallback() {

    }
    disconnectedCallback() {

        this.unsubscribe();
    }





    attributeChangedCallback() {

    }
}
