import {EventEmitter} from "node:events";

function createDOMEvent() {
    const emitter = new EventEmitter();

    return {
        addEventListener(eventType, listener) {
            emitter.on(eventType, listener);
        },

        removeEventListener(eventType, listener) {
            emitter.off(eventType, listener);
        },

        dispatchEvent(event) {
            event.target = this;
            event.currentTarget = this;
            emitter.emit(event.type, event);
        }
    };
}


const button = createDOMEvent();

button.addEventListener("save", () => {
    console.log("Saving...");
});

function handleClick(event) {
    console.log("Button clicked!", event);
}

button.addEventListener("click", handleClick);

button.dispatchEvent({
    type: "save"
});

button.dispatchEvent({
    type: "click"
});