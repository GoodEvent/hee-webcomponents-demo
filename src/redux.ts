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
    constructor(public state: T, public reducer: Function) {

    }
    dispatch(action) {
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

const store = new Store({}, rootReducer);

export { store };