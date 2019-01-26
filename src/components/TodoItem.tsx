import React from 'react';
import classNames from 'classnames';

export type TodoItemProps = {
    editing?: boolean;
    editValue: string;
    onEditStart: (uuid: TodoUUID) => void;
    onEditKeyUp: React.KeyboardEventHandler<HTMLInputElement>;
    onEditChange: React.ChangeEventHandler<HTMLInputElement>;
    onCheckboxChange: (uuid: TodoUUID, event: React.ChangeEvent<HTMLInputElement>) => void;
    onDestroy: (uuid: TodoUUID) => void;
};

const TodoItem: React.FunctionComponent<Todo & TodoItemProps> = ({
    completed,
    label,
    uuid,
    editing,
    editValue,
    onEditStart,
    onEditKeyUp,
    onEditChange,
    onCheckboxChange,
    onDestroy,
}) => (
    <li className={classNames({ completed, editing })}>
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                onChange={(event) => onCheckboxChange(uuid, event)}
                checked={completed}
            />
            <label onDoubleClick={() => onEditStart(uuid)}>{label}</label>
            <button className="destroy" onClick={() => onDestroy(uuid)} />
        </div>
        {editing && (
            <input
                className="edit"
                onKeyUp={onEditKeyUp}
                onChange={onEditChange}
                value={editValue}
            />
        )}
    </li>
);

export default TodoItem;
