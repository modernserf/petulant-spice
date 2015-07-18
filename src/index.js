"use strict";

import "babel/polyfill";
import "whatwg-fetch";
import React from "react";
import RootElement from "views";
import { provide, createDispatcher } from 'dux';

const DOM_READY = "DOMContentLoaded";

const initApp = {
    window: {},
    rootElement: React.createFactory(provide(RootElement))
};
function app (state=initApp, action) {
    switch (action.type) {
    case DOM_READY:
        return state::update(['window','domNode'],() => action.payload);
    }
    return state;
}

function doAsync (fn) {
    return window.setTimeout(fn,1);
}

function appListener (state) {
    console.log('appOutput',state);
    doAsync(() => {
        React.render(state.rootElement({state}), state.window.domNode);
    });
}

const dispatch = createDispatcher(app,appListener);

const domActions = {
    ready: (domNode) => (dispatch) =>  {
        dispatch({type: DOM_READY, payload: domNode });
    }
};

window.addEventListener("DOMContentLoaded", () => {
    dispatch(domActions.ready(document.getElementById("main")));
});

// TODO: generic get, set
const _updateIn = (path, fn, object) => {
    const [key, ...rest] = path;

    return {
        ...object,
        [key]: rest.length ?
            _updateIn(rest, fn, object[key]) :
            fn(object[key])
    };
};

function update (path, fn) {
    return _updateIn(path, fn, this);
}