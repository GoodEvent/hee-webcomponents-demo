import { store } from "@/index";
import { Layout } from "./ee-layout";
import { Login } from "./ee-login";
import { Search } from "./page/ee-search";
import { Blank } from "./page/ee-blank";
import { ShowProgress } from "./page/ee-show-progress";
import { Tree } from "./page/ee-tree";

const routerTable = [{
    url: '/login', component: Login.mtagName,
}, {
    url: '/layout', component: Layout.mtagName, children: [
        { url: '/search', component: Search.mtagName },
        { url: '/blank', component: Blank.mtagName },
        { url: '/show-progress', component: ShowProgress.mtagName },
        { url: '/tree', component: Tree.mtagName },
    ]
}];
export let router = (state, action) => {
    switch (action.type) {
        case 'push': {
            let nowRouterTable = routerTable;
            let pathname: string = action.payload;
            let routerQueue = [];
            while (pathname) {
                let router = nowRouterTable
                    .find(item => pathname.startsWith(item.url));
                if (router) {
                    routerQueue.push(router);
                    pathname = pathname.replace(router.url, '');
                    nowRouterTable = router.children;
                } else {
                    throw `not match ${pathname}`;
                }
            }
            return routerQueue;
        }

        case 'replace': {
            let nowRouterTable = routerTable;
            let pathname: string = action.payload;
            let routerQueue = [];
            while (pathname) {
                let router = nowRouterTable
                    .find(item => pathname.startsWith(item.url));
                if (router) {
                    routerQueue.push(router);
                    pathname = pathname.replace(router.url, '');
                    nowRouterTable = router.children;
                } else {
                    throw `not match ${pathname}`;
                }
            }
            return routerQueue;
        }
        case 'load': {
            let nowRouterTable = routerTable;
            let pathname: string = action.payload;
            let routerQueue = [];
            while (pathname) {
                let router = nowRouterTable
                    .find(item => pathname.startsWith(item.url));
                if (router) {
                    routerQueue.push(router);
                    pathname = pathname.replace(router.url, '');
                    nowRouterTable = router.children;
                } else {
                    throw `not match ${pathname}`;
                }
            }
            return routerQueue;
        }
        case 'router/loadcomponent': {
            return action.payload;
        }
        default:
            return state;
    }
}

export let routerLoading = (state = false, action) => {
    switch (action.type) {
        case 'routeloadend':
            return false;
        case 'routeloadstart':
            return true;
        default:
            return state;
    }
}

export const routerMiddleware = store => next => action => {
    if (action.type === 'push') {
        const rs = next(action);
        history.pushState(null, null, action.payload);
        return rs;
    } else if (action.type === 'replace') {
        const rs = next(action);
        history.replaceState(null, null, action.payload);
        return rs;
    } else if (action.type === 'load') {
        const rs = next(action);
        history.replaceState(null, null, action.payload);
        return rs;
    } else {
        const rs = next(action);
        return rs;
    }


}

export class Router extends HTMLElement {
    static mtagName = "ee-router";
    router
    constructor() {
        // 必须首先调用 super 方法
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        store.dispatch({ type: 'load', payload: location.pathname })
        store.dispatch({ type: 'routeloadstart' });
        shadow.innerHTML = this.render();
    }

    route = [];

    connectedCallback() {
        store.subscribe(() => {
            let state = store.getState();
            let routerLoading = state.routerLoading;
            let router = state.router;
            if (!routerLoading && router.length > 0) {
                store.dispatch({ type: 'routeloadstart' });
                this.shadowRoot.innerHTML = this.render();
            } else {

            }

        });
    }

    render() {
        return `
        <ee-route></ee-route>
        `
    }
}

export class RouterOut extends HTMLElement {
    static mtagName = "ee-route";
    html;
    currentComponent;
    constructor() {
        // 必须首先调用 super 方法
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        
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
        let state = store.getState();
        let routerQueue: any[] = state.router;
        if (routerQueue && routerQueue.length > 0) {
            let queue = [...routerQueue];
            let route = queue.shift();
            let newHtml = this.render(route);
            store.dispatch({ type: 'router/loadcomponent', payload: queue });
            this.shadowRoot.innerHTML = newHtml;
            if (queue.length === 0) {
                store.dispatch({ type: 'routeloadend' });
            }
        }
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



window.addEventListener('popstate', (e) => {
    let pathname = location.pathname;
    store.dispatch({ type: 'load', payload: pathname });
});