export function bindEventsMethods(eventNameList: string[]) {
    eventNameList.forEach(eventName => {
        document.body.addEventListener(eventName, getEventListener(eventName));
        document.body.addEventListener(eventName, getEventListenerCapture(eventName), true);
    });
}

export function getEventListener(eventName: string): EventListener {
    return (e: Event) => {
        let path = getEventPath(e) as HTMLElement[];
        path.pop();
        path.pop();
        while (path.length > 0) {
            let element = path.shift() as HTMLElement;
            let instance = findInstance(path);
            if (element.hasAttribute) {
                setTimeout(()=>{
                    execMethod(element, `${eventName}`, instance, e);
                })
                
            }

        }
    }
}

export function getEventListenerCapture(eventName: string): EventListener {
    return (e: Event) => {
        let opath = getEventPath(e) as HTMLElement[];
        opath.pop();
        opath.pop();
        let path = [...opath].reverse();
        while (true) {
            let instance = findInstance(path);
            let rs = findTargets(path, instance);
            if (instance) {
                // console.log(rs.targets);
                rs.targets.forEach(element => {
                    setTimeout(()=>{
                        execMethod(element, `${eventName},true`, instance, e);
                    })
                });

            }
            path = path.slice(rs.nexteIndex + 1, path.length);
            if (rs.nexteIndex === -1) return;
        }

    }
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








