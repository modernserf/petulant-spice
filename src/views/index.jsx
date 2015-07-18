"use strict";
import React from "react";
import { connect } from 'dux';

export function mapProps (props) {
    React.Children.map(this,(child) => React.cloneElement(child,props));
}

@connect()
export default class Root extends React.Component {
    render () {
        console.log(this.props);

        return (
            <div>it works!</div>
        );
    }
}
