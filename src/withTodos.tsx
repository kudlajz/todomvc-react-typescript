import React, { Component, ComponentType } from 'react';
import { Subtract } from 'utility-types';

import { ITodo } from './interfaces';

interface InjectedProps {
    todos: ITodo[];
};

interface IState {
    todos: ITodo[];
};

const withTodos = <WrappedProps extends InjectedProps>(WrappedComponent: ComponentType<WrappedProps>) =>
    class WithTodos extends Component<Subtract<WrappedProps, InjectedProps>, IState> {
        static readonly displayName = `withTodos(${WrappedComponent.name})`;

        readonly state = {
            todos: [] as ITodo[],
        };

        render() {
            // {...this.props as WrappedProps} is a temporary solution due to bug in Typescript compiler.
            // https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046
            return (
                <WrappedComponent {...this.props as WrappedProps} todos={this.state.todos} />
            );
        }
    };

export default withTodos;
