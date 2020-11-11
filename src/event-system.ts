let eventStopPropagation = false;

export function bindEventsMethods(eventNameList: string[]) {
    eventNameList.forEach(eventName => {
        document.body.addEventListener(eventName, (e) => {
            scheduler(e, false);
        });
        document.body.addEventListener(eventName, e => {
            scheduler(e, true);
        }, true);
    });
}

export function scheduler(e: Event, capture: boolean) {
    if (!capture) {
        let queue = getBubbleQueue(e);
        while (!eventStopPropagation && queue.length > 0) {
            let listener = queue.shift();
            let fakeElement = document.createElement('EeNode');
            let syntheticEvent = buildSyntheticEvent(e);
            fakeElement.addEventListener(e.type, listener, capture);
            fakeElement.dispatchEvent(syntheticEvent);
            fakeElement.removeEventListener(e.type, listener, capture);
        }
        eventStopPropagation = false; //在事件冒泡阶段结束后恢复eventStopPropagation全局变量
    } else {
        let queue = getCaptureQueue(e);
        while (!eventStopPropagation && queue.length > 0) {
            let listener = queue.shift();
            let fakeElement = document.createElement('EeNode');
            let syntheticEvent = buildSyntheticEvent(e);
            fakeElement.addEventListener(e.type, listener, capture);
            fakeElement.dispatchEvent(syntheticEvent);
            fakeElement.removeEventListener(e.type, listener, capture);
        }
    }

}

export function buildSyntheticEvent(e: Event) {
    if (CustomEvent) {
        let event = new CustomEvent(e.type, { bubbles: true, cancelable: true });
        event.stopPropagation = () => { e.stopPropagation(); eventStopPropagation = true }
        return event;
    } else if (document.createEvent) {
        let event = document.createEvent('Event');
        event.initEvent(e.type, true, true);
        event.stopPropagation = () => { e.stopPropagation(); eventStopPropagation = true }
        return event;
    } else {
        return {
            type: e.type,
            stopPropagation: () => { e.stopPropagation(); }
        } as Event;
    }
}

export function getBubbleQueue(e: Event) {
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
                    let listener = () => {
                        let args = getArgs(attr, e, instance);
                        instance[method](...args);
                    };
                    queue.push(listener);
                }

            }
        }
    }
    return queue;
}

export function getCaptureQueue(e: Event) {
    let opath = getEventPath(e) as HTMLElement[];
    opath.pop();
    opath.pop();
    let queue = [];
    let path = [...opath].reverse();
    let eventName = e.type;
    while (true) {
        let instance = findInstance(path);
        let rs = findTargets(path, instance);
        if (instance) {
            rs.targets.forEach(element => {
                if (element.hasAttribute) {
                    if (element.hasAttribute(`(${eventName},true)`)) {
                        let attr = element.getAttribute(`(${eventName},true)`);
                        let method = getMethod(attr);
                        if (instance[method]) {
                            let listener = (e: Event) => {
                                let args = getArgs(attr, e, instance);
                                instance[method](...args);
                            };
                            queue.push(listener);
                        }

                    }
                }
            });

        }
        path = path.slice(rs.nexteIndex + 1, path.length);
        if (rs.nexteIndex === -1) break;
    }
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

export function getMethod(name: string) {
    let sp = name.split('(');
    return sp[0];
}








