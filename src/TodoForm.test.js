import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";

describe('<TodoForm />', () => {
    const setup = (props = {}) => {
        const utils = render(<TodoForm { ...props } />);
        const inputElement = utils.getByPlaceholderText('할 일을 입력하세요');
        const buttonElement = utils.getByText('등록');
        return {
            ...utils,
            inputElement,
            buttonElement
        }
    }
    it('정상적으로 렌더링하는지 체크', () => {
        const { inputElement, buttonElement } = setup();
        expect(inputElement).toBeTruthy();
        expect(buttonElement).toBeTruthy();
    })

    it('onChange Event', () => {
        const { inputElement } = setup();
        fireEvent.change(inputElement, {
            target: {
                value: 'input value'
            }
        });
        expect(inputElement).toHaveAttribute('value', 'input value');
    })

    it('calls onInsert and clears input', () => {
        const onInsert = jest.fn();
        const { inputElement, buttonElement } = setup({ onInsert });
        fireEvent.change(inputElement, {
            target: {
                value: 'input event test'
            }
        });
        fireEvent.click(buttonElement);
        expect(onInsert).toBeCalledWith('input event test');
        expect(inputElement).toHaveAttribute('value', ''); // input이 비워져야함
    })
})