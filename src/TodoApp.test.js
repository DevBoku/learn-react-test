import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoApp from './TodoApp';

describe('<TodoApp />', () => {
    it('Render Todo Form, Todo List', () => {
        const { getByTestId } = render(<TodoApp />);
        getByTestId('TodoForm');
        getByTestId('TodoList');
    })

    it('Render rwo default todos', () => {
        const { getByText } = render(<TodoApp />);
        getByText('TDD 배우기');
        getByText('react-testing-library 사용하기');
    })

    it('creates new todo', () => {
        const { getByPlaceholderText, getByText } = render(<TodoApp />);
        const input = getByPlaceholderText('할 일을 입력하세요');

        fireEvent.change(input, {
            target: {
                value: '새 항목 추가하기'
            }
        });
        fireEvent.click(getByText('등록'));

        getByText('새 항목 추가하기');
    })

    it('toggles todo', () => {
        const { getByText } = render(<TodoApp />);

        const todoText = getByText('TDD 배우기');
        expect(todoText).toHaveStyle('text-decoration: line-through');
        fireEvent.click(todoText);
        expect(todoText).not.toHaveStyle('text-decoration: line-through');
        fireEvent.click(todoText);
        expect(todoText).toHaveStyle('text-decoration: line-through');
    })

    it('removes todo', () => {
        const { getByText } = render(<TodoApp />);
        const todoText = getByText('TDD 배우기');
        const removeButton = todoText.nextSibling;
        fireEvent.click(removeButton);
        expect(todoText).not.toBeInTheDocument();
    })
});