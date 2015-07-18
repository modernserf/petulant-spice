"use strict";
import React, { PropTypes } from "react";

const CONTEXT_NAME = "petulant-spice";

const validContext = PropTypes.object;

const contextTypes = {
    [CONTEXT_NAME]: validContext
};

export function provide (Component) {
    return class Provider extends React.Component {
        static childContextTypes = contextTypes
        getChildContext () {
            return {
                [CONTEXT_NAME]: this.props.state
            };
        }
        render () {
            return React.createElement(Component);
        }
    };
}

export const connect = (select) => (Component) => {
    select = select || () => {};
    return class Connector extends React.Component {
        static contextTypes = contextTypes
        render () {
            const context = this.context[CONTEXT_NAME];
            const props = {
                dispatch: context.dispatch,
                ...select(context)
            };

            return React.createElement(Component, props);
        }
    };
};

export function createDispatcher (reducer, listener) {
    let state = reducer(undefined, {type: "INIT" + Date.now()});

    const setState = (nextState) =>  {
        if (state !== nextState) {
            state = nextState;
            listener(nextState);
        }
    };

    // inside action
    const dispatchAction = (action) => {
        setState(reducer(state, action));
    };

    // outside action
    function dispatch (actionCreator) {
        actionCreator(dispatchAction, state);
    }

    state.dispatch = dispatch;

    return dispatch;
}