export const rootReducer = (state, action) => {
    switch (action.type) {
        case 'add': return { ...state, count: state.count + 1 };
        case 'add1': return { ...state, name: state.name + 1 };
        case 'decrease': return { ...state, count: state.count - 1 };
        default: return state;
    }
}

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
        return () => {
            this.listeners.splice(index - 1, 1);
        };
    }
}

const store = new Store({ count: 0, name: '罗霄', age: 100 }, rootReducer);

export { store };