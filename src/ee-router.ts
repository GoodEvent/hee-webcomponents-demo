import { store } from "./redux";
import { Layout } from "./ee-layout";
import { Login } from "./ee-login";

const routerTable = [{
    url: '/login', component: Login.mtagName
}, {
    url: '/layout', component: Layout.mtagName
}]

export let router = (state, action) => {
    switch (action.type) {
        case 'push': {
            let router = routerTable.find(item => item.url === action.payload);
            if (router) {
                return router;
            } else {
                console.log('not found');
                return state;
            }
        }

        case 'replace': {
            let router = routerTable.find(item => item.url === action.payload);
            if (router) {
                return router;
            } else {
                return state;
            }
        }
        case 'init': {
            let router = routerTable.find(item => item.url === action.payload);
            if (router) {
                return router;
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}

export class Router extends HTMLElement {
    static mtagName = "ee-router";
    html;
    constructor() {
        // 必须首先调用 super 方法
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.html = this.render(store.getState().router);
        shadow.innerHTML = this.html;
        let pathname = location.pathname;
        store.dispatch({ type: 'replace', payload: pathname })
        store.subscribe(() => {
            let state = store.getState();
            let router = state.router;
            let newHtml = this.render(router);
            if (newHtml !== this.html) {
                this.html = newHtml;
                shadow.innerHTML = this.html;
            }
            // this.setAttribute('component',router.component);

            // shadow.innerHTML = 
        });
    }

    render(router: { url: string, component: string }) {
        return `
        ${router
                ?
                ` <${router.component}></${router.component}>`
                :
                ``
            }
       
        `;
    }

    connectedCallback() {
        // bindEventsMethods(this);
    }

    static get observedAttributes() { return ['component']; }

    get component() {
        return this.getAttribute('component');
    }

    attributeChangedCallback() {
        // console.log('change');
        // var shadow = this.shadowRoot;
        // shadow.innerHTML = this.render(store.getState().router)
        // shadow.innerHTML = this.render(store.getState().router);

    }

    // changeName($event, name, age) {
    //     this.setAttribute('name', name + 1);
    // }
    // changeAge($event, name, age) {
    //     this.setAttribute('age', age + 1);
    // }


}




export const routerMiddleware = store => next => action => {
    if (action.type === 'push') {
        history.pushState(null, null, action.payload);
        const rs = next(action);
        return rs;
    } else if (action.type === 'replace') {
        history.replaceState(null, null, action.payload);
        const rs = next(action);
        return rs;
    } else {
        const rs = next(action);
        return rs;
    }


}



window.addEventListener('popstate', (e) => {
    console.log('addEvet');
});