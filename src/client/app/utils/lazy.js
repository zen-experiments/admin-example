'use strict';

import React, {Component} from 'react';

function lazy(load) {
    return class Async extends Component {
        static get Comp() {
            return null;
        }

        constructor(props, context) {
            super(props, context);
            this.state = {Comp: Async.Comp};
        }

        componentWillMount() {
            const {Comp} = this.state;

            if (!Comp) {
                load().then((mod) => {
                    return mod.default || mod;
                }).then((Comp) => {
                    Async.Comp = Comp;

                    if (this._mounted) {
                        this.setState({Comp});
                    } else {
                        this.state.Comp = Comp;
                    }
                });
            }
        }

        componentDidMount() {
            this._mounted = true;
        }

        render() {
            const {Comp} = this.state;
            return Comp ? <Comp {...this.props} /> : null;
        }
    }
}

export {
    lazy
};
