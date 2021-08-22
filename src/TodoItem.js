import React, { useMemo, useCallback } from 'react';

function TodoItem({ todo: { id, text, done }, onToggle, onRemove }) {
    const style = useMemo(() => {
        return {
            textDecoration: done ? 'line-through' : ''
        }
    }, [done]);
    const onClickToggle = useCallback(() => onToggle(id), [onToggle, id]);
    const onClickRemove = useCallback(() => onRemove(id), [onRemove, id]);
    return <li>
        <span style={style} onClick={onClickToggle}>{text}</span>
        <button onClick={onClickRemove}>삭제</button>
    </li>;
}

export default TodoItem;