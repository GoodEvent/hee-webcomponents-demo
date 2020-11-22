export interface Task {
    instance: HTMLElement
    method: string
    execMethodExpression: string
}

export function bindEventsMethods(eventNameList: string[]) {
    eventNameList.forEach(eventName => {
        let syntheticEvent = new SyntheticEvent();
        document.body.addEventListener(eventName, (e) => {
            syntheticEvent.nativeEvent = e;
            scheduler(e, false, syntheticEvent);
        });
        document.body.addEventListener(eventName, e => {
            syntheticEvent.nativeEvent = e;
            scheduler(e, true, syntheticEvent);
        }, true);
    });
}

export function scheduler(e: Event, capture: boolean, syntheticEvent: SyntheticEvent) {
    if (!capture) {
        let queue = getBubbleQueue(e);
        while (!syntheticEvent.isStopPropagation && queue.length > 0) {
            let { method, execMethodExpression, instance } = queue.shift();
            let listener = () => {
                let args = getArgs(execMethodExpression, syntheticEvent, instance);
                instance[method](...args);
            };
            let fakeElement = document.createElement('EeNode');
            let tirggerEvent = buildTirggerEvent(e);
            fakeElement.addEventListener(e.type, listener, capture);
            fakeElement.dispatchEvent(tirggerEvent);
            fakeElement.removeEventListener(e.type, listener, capture);
        }
        syntheticEvent.isStopPropagation = false; //在事件冒泡阶段结束后恢复isStopPropagation全局变量
    } else {
        let queue = getCaptureQueue(e);
        while (!syntheticEvent.isStopPropagation && queue.length > 0) {
            let { method, execMethodExpression, instance } = queue.shift();
            let listener = () => {
                let args = getArgs(execMethodExpression, syntheticEvent, instance);
                instance[method](...args);
            };
            let fakeElement = document.createElement('EeNode');
            let tirggerEvent = buildTirggerEvent(e);
            fakeElement.addEventListener(e.type, listener, capture);
            fakeElement.dispatchEvent(tirggerEvent);
            fakeElement.removeEventListener(e.type, listener, capture);
        }
    }

}

export class SyntheticEvent {
    public nativeEvent: Event;
    public isStopPropagation = false;
    constructor() {

    }
    stopPropagation() {
        this.nativeEvent.stopPropagation();
        this.isStopPropagation = true;
    }
    preventDefault() {
        this.nativeEvent.preventDefault();
    }
}

export function buildTirggerEvent(e: Event) {
    if (CustomEvent) {
        let event = new CustomEvent(e.type);
        return event;
    } else if (document.createEvent) {
        let event = document.createEvent('Event');
        event.initEvent(e.type);
        return event;
    } else {
        return {
            type: e.type,
        } as Event;
    }
}

export function getBubbleQueue(e: Event): Task[] {
    let path = getEventPath(e) as HTMLElement[];
    path.pop();
    path.pop();
    let queue = [];
    let eventName = e.type;
    while (path.length > 0) {
        let element = path.shift() as HTMLElement;
        let instance = findInstance(path);
        if (element.hasAttribute) {
            if (element.hasAttribute(`(${eventName})`)) {
                let attr = element.getAttribute(`(${eventName})`);
                let method = getMethod(attr);
                if (instance[method]) {
                    let task: Task = {
                        instance,
                        method,
                        execMethodExpression: attr
                    }
                    queue.push(task);
                }

            }
        }
    }
    return queue;
}

export function getCaptureQueue(e: Event): Task[] {
    let path = getEventPath(e) as HTMLElement[];
    path.pop();
    path.pop();
    let queue = [];
    let eventName = e.type;
    while (path.length > 0) {
        let element = path.shift() as HTMLElement;
        let instance = findInstance(path);
        if (element.hasAttribute) {
            if (element.hasAttribute(`(${eventName},true)`)) {
                let attr = element.getAttribute(`(${eventName},true)`);
                let method = getMethod(attr);
                if (instance[method]) {
                    let task: Task = {
                        instance,
                        method,
                        execMethodExpression: attr
                    }
                    queue.push(task);
                }

            }
        }
    }
    queue.reverse();
    return queue;
}

export function getEventPath(event: Event): EventTarget[] {
    if (event.composedPath) {
        return event.composedPath();
    } else if (event['path']) {
        return event['path'];
    } else {
        let path = [];
        let target = event.target as HTMLElement;
        while (target.parentNode !== null) {
            path.push(target);
            target = target.parentNode as HTMLElement;
        }
        this.path.push(document, window);
        return this.path;
    }
}

export function findInstance(path: HTMLElement[]): HTMLElement {

    let element = path.find((element) => {
        let tagName = element.tagName;
        if (tagName) {
            if (customElements.get(tagName.toLowerCase())) {
                return true;
            }
        }
    });
    return element;
}



export function findTargets(path: HTMLElement[], instance: HTMLElement) {
    let eIndex = path.findIndex((element) => {
        return element === instance;
    })

    let newPath = path.slice(eIndex + 1, path.length);

    let nexteIndex = newPath.findIndex((element) => {
        let tagName = element.tagName;
        if (tagName) {
            if (customElements.get(tagName.toLowerCase())) {
                return true;
            }
        }
    });
    if (nexteIndex !== -1) {
        return {
            targets: newPath.slice(1, nexteIndex + 1),
            nexteIndex: nexteIndex + eIndex
        }

    } else {
        return {
            targets: newPath.slice(1, newPath.length),
            nexteIndex
        }
    }
}

export function execMethod(element: HTMLElement, eventName: string, instance: HTMLElement, e: Event) {
    if (element.hasAttribute) {
        if (element.hasAttribute(`(${eventName})`)) {
            let attr = element.getAttribute(`(${eventName})`);
            let method = getMethod(attr);
            let args = getArgs(attr, e, instance);
            if (instance[method]) {
                instance[method](...args);
            }

        }
    }
}


export function getArgs(name: string, e, instance) {
    let argsKey = name.split('(')[1].replace(')', '').split(',');
    let args = argsKey.map(key => {
        if (key) {
            if (key === '$event') {
                return e;
            } else if (instance[key]) {
                return instance[key];
            } else {

            }
        }

    });
    return args;
}

/**
 * (click)="foo()"
 * 
 * getMethod("foo()")
 * 
 * will return "foo"
 * @param name 
 */
export function getMethod(name: string) {
    let sp = name.split('(');
    return sp[0];
}








