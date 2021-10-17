import { store } from '@/index';
import { Layout } from './ee-layout';
import { Login } from './ee-login';
import { Search } from './page/ee-search';
import { Blank } from './page/ee-blank';
import { ShowProgress } from './page/ee-show-progress';
import { LitElement } from 'lit';
// import { Tree } from "./page/ee-tree";

interface RouterConfig {
  url: string;
  component: any;
  children?: RouterConfig[];
}

const routerTable: RouterConfig[] = [
  {
    url: '/login',
    component: Login,
  },
  {
    url: '/layout',
    component: Layout,
    children: [
      { url: '/search', component: Search },
      { url: '/blank', component: Blank },
      { url: '/show-progress', component: ShowProgress },
      // { url: '/tree', component: Tree.mtagName },
    ],
  },
];

function loadRoute(action) {
  let nowRouterTable = routerTable;
  let pathname: string = action.payload;
  let routerQueue = [];
  while (pathname) {
    let router = nowRouterTable.find((item) => pathname.startsWith(item.url));
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

export let router = (state = null, action) => {
  switch (action.type) {
    case 'push': {
      return loadRoute(action);
    }

    case 'replace': {
      return loadRoute(action);
    }
    case 'load': {
      return loadRoute(action);
    }
    case 'router/loadcomponent': {
      return action.payload;
    }
    default:
      return state;
  }
};

export let routerLoading = (state = false, action) => {
  switch (action.type) {
    case 'routeloadend':
      return false;
    case 'routeloadstart':
      return true;
    default:
      return state;
  }
};

export const routerMiddleware = (store) => (next) => (action) => {
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
};

export class Router extends HTMLElement {
  static mtagName = 'ee-router';
  router;
  constructor() {
    // 必须首先调用 super 方法
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    store.dispatch({ type: 'load', payload: location.pathname });
    store.dispatch({ type: 'routeloadstart' });
    shadow.innerHTML = this.render();
  }

  route = [];

  connectedCallback() {
    console.log('foo');
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
  contentEditable;
  render() {
    return `
        <ee-route></ee-route>
        `;
  }
}

export class RouterOut extends HTMLElement {
  static mtagName = 'ee-route';
  html;
  currentComponent;
  constructor() {
    // 必须首先调用 super 方法
    super();
    const shadow = this.attachShadow({ mode: 'open' });
  }

  render(router: { url: string; component: any }) {
    if (router) {
      return new router.component();
    } else {
      return null;
    }
  }

  connectedCallback() {
    let state = store.getState();
    let routerQueue: any[] = state.router;
    if (routerQueue && routerQueue.length > 0) {
      let queue = [...routerQueue];
      let route = queue.shift();
      let newHtml = this.render(route);
      store.dispatch({ type: 'router/loadcomponent', payload: queue });
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(newHtml);
      if (queue.length === 0) {
        store.dispatch({ type: 'routeloadend' });
      }
    }
  }

  static get observedAttributes() {
    return ['component'];
  }

  get component() {
    return this.getAttribute('component');
  }

  attributeChangedCallback() {}
}

window.addEventListener('popstate', (e) => {
  let pathname = location.pathname;
  store.dispatch({ type: 'load', payload: pathname });
});
