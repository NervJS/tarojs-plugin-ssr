/**
 * @jest-environment jsdom
 */

import React, {forwardRef} from 'react'
import {render, fireEvent} from '@testing-library/react'
import useTaroBaseEvents from '@taror/components/lib/_util/hooks/useTaroBaseEvents'

const TestComponentInternal: React.ForwardRefRenderFunction<HTMLDivElement, any> = (
    {children, ...rest},
    ref
) => {
    const props = useTaroBaseEvents(rest)
    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    )
}
const TestComponent = forwardRef(TestComponentInternal)

describe('useTaroBaseEvents', () => {
    let parentRef = React.createRef<HTMLDivElement>()
    let childRef1 = React.createRef<HTMLDivElement>()
    let childRef2 = React.createRef<HTMLDivElement>()

    const handleParentTouchStart = jest.fn()
    const handleParentTouchEnd = jest.fn()
    const handleParentClick = jest.fn()
    const handleParentLongPress = jest.fn()

    beforeEach(() => {
        render(
            <TestComponent
                ref={parentRef}
                onTouchStart={handleParentTouchStart}
                onTouchEnd={handleParentTouchEnd}
                onClick={handleParentClick}
                onLongPress={handleParentLongPress}
            >
                <TestComponent ref={childRef1} />
                <TestComponent
                    ref={childRef2}
                    onClick={event => {
                        event.stopPropagation()
                    }}
                />
            </TestComponent>
        )
    })

    afterEach(() => {
        parentRef = React.createRef<HTMLDivElement>()
        childRef1 = React.createRef<HTMLDivElement>()
        childRef2 = React.createRef<HTMLDivElement>()

        handleParentTouchStart.mockClear()
        handleParentTouchEnd.mockClear()
        handleParentClick.mockClear()
        handleParentLongPress.mockClear()
    })

    it('basic events', () => {
        fireEvent.mouseDown(parentRef.current)
        fireEvent.mouseUp(parentRef.current)
        fireEvent.click(parentRef.current)
        expect(handleParentTouchStart.mock.calls.length).toBe(1)
        expect(handleParentTouchEnd.mock.calls.length).toBe(1)
        expect(handleParentClick.mock.calls.length).toBe(1)
        expect(handleParentLongPress.mock.calls.length).toBe(0)
    })

    it('longpress event', cb => {
        fireEvent.mouseDown(parentRef.current)
        setTimeout(() => {
            fireEvent.mouseUp(parentRef.current)
            fireEvent.click(parentRef.current)
            expect(handleParentTouchStart.mock.calls.length).toBe(1)
            expect(handleParentTouchEnd.mock.calls.length).toBe(1)
            expect(handleParentClick.mock.calls.length).toBe(0)
            expect(handleParentLongPress.mock.calls.length).toBe(1)
            cb()
        }, 500)
    })

    it('default event propagation', () => {
        fireEvent.mouseDown(childRef1.current)
        fireEvent.mouseUp(childRef1.current)
        fireEvent.click(childRef1.current)
        expect(handleParentTouchStart.mock.calls.length).toBe(1)
        expect(handleParentTouchEnd.mock.calls.length).toBe(1)
        expect(handleParentClick.mock.calls.length).toBe(1)
        expect(handleParentLongPress.mock.calls.length).toBe(0)
    })

    it('can stop event propagation', () => {
        fireEvent.mouseDown(childRef2.current)
        fireEvent.mouseUp(childRef2.current)
        fireEvent.click(childRef2.current)
        expect(handleParentTouchStart.mock.calls.length).toBe(1)
        expect(handleParentTouchEnd.mock.calls.length).toBe(1)
        expect(handleParentClick.mock.calls.length).toBe(0)
        expect(handleParentLongPress.mock.calls.length).toBe(0)
    })
})
