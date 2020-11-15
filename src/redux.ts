import { promises } from "fs";

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

export const rootReducer = combineReducers({ users, loading });

export class Store<T = any> {
    listeners: Function[] = [];
    constructor(public state: T, public reducer: Function, public middlewares: Function[]) {

    }

    dispatch(action) {
        this.middlewares.forEach(middleware => {
            middleware(this.realDispatch, action);
        });
        this.realDispatch(action);
    }

    realDispatch = (action) => {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener(this.state));
    }
    subscribe(listener: Function) {
        let index = this.listeners.push(listener);
        listener(this.state);
        return () => {
            this.listeners.splice(index - 1, 1);
        };
    }
}

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


export function getUserThunk() {
    return (dispatch) => {
        return fetch('/zh.json')
            .then(res => res.json())
            .then(rs => {
                dispatch({ type: 'set', payload: rs });
            }, error => {
                console.log(error);
            })
            .finally(() => {
                dispatch({ type: 'fetchend' });
            });
    };
}

export function thunk(dispatch, action) {
    if (action instanceof Function) {
        let p = action(dispatch);
        if (p instanceof Promise) {
            p.then(() => {

            });
        }
    } else {
        console.log(action);
    }
}

const store = new Store({}, rootReducer, [thunk]);

export { store };