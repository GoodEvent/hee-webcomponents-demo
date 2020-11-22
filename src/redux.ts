import { composeWithDevTools } from 'redux-devtools-extension';
import { router, routerMiddleware, routerLoading } from "./ee-router";
export const users = (state = [], action) => {
    switch (action.type) {
        case 'set': return action.payload;
        default: return state;
    }
}

export const loading = (state = false, action) => {
    switch (action.type) {
        case 'fetching': return true;
        case 'fetchend': return false;
        default: return state;
    }
}

export const rootReducer = combineReducers({ users, loading, router, routerLoading });

// export class Store<T = any> {
//     listeners: Function[] = [];
//     constructor(public state: T, public reducer: Function, public middlewares: Function[]) {

//     }

//     dispatch(action) {
//         this.middlewares.forEach(middleware => {
//             middleware(this.realDispatch, action);
//         });
//         this.realDispatch(action);
//     }

//     realDispatch = (action) => {
//         this.state = this.reducer(this.state, action);
//         this.listeners.forEach(listener => listener(this.state));
//     }
//     subscribe(listener: Function) {
//         let index = this.listeners.push(listener);
//         listener(this.state);
//         return () => {
//             this.listeners.splice(index - 1, 1);
//         };
//     }
// }

export function combineReducers(obj) {
    const keys = Object.keys(obj);
    return (state, action) => {
        return keys.reduce((pre, current) => {
            let value = obj[current](state[current], action);
            pre[current] = value;
            return pre;
        }, {});
    };
}




const randomString = () =>
    Math.random().toString(36).substring(7).split('').join('.')

const ActionTypes = {
    INIT: `@@redux/INIT${/* #__PURE__ */ randomString()}`,
    REPLACE: `@@redux/REPLACE${/* #__PURE__ */ randomString()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
}
export function createStore(reducer, initState, enhaner) {
    let listeners: Function[] = [];
    let state = initState;
    let currentReducer = reducer;
    if (enhaner instanceof Function) {
        return enhaner(createStore)(reducer, initState);
    }
    let dispatch = (action) => {
        state = currentReducer(state, action);
        listeners.forEach(listener => listener());
        return action;
    }

    let subscribe = (listener: Function) => {
        listeners.push(listener);
        listener(getState());
        return () => {
            listeners = listeners.filter(item => {
                return item != listener;
            });
        };
    }

    let getState = () => {
        return state;
    }
    dispatch({ type: ActionTypes.INIT });
    const store = {
        getState,
        dispatch,
        subscribe
    }
    return store;
}

export const logMiddleware = store => next => action => {
    console.log('dispatching', action);
    const rs = next(action);
    console.log('next state:' + store.getState());
    return rs;
};

export function getUserThunk() {
    return (dispatch) => {
        return fetch('/cars.json')
            .then(res => res.json())
            .then(rs => {
                dispatch({ type: 'set', payload: rs });
            }, error => {
            })
            .finally(() => {
                dispatch({ type: 'fetchend' });
            });
    };
}

export const thunkMiddleware = store => next => action => {
    if (action instanceof Function) {
        return action(next);
    } else {
        const rs = next(action);
        return rs;
    }


}



const applyMiddleware = (middlewares: Function[]) => createStore => (rootReducer, iniState) => {
    const store = createStore(rootReducer, iniState);
    middlewares = middlewares.slice();
    middlewares.reverse();
    let dispatch = store.dispatch;
    middlewares.forEach(middleware => {
        dispatch = middleware(store)(dispatch);
    });
    return Object.assign({}, store, { dispatch });
}


let store = createStore(rootReducer, {},
    composeWithDevTools(
    applyMiddleware([thunkMiddleware,routerMiddleware])
    )
);

// let store = applyMiddleware([logMiddleware,thunkMiddleware])(createStore)(rootReducer, {});
// const store = new Store({}, rootReducer, [thunk]);
// const eh = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

// const store = eh(createStore)(rootReducer, {});
export { store };