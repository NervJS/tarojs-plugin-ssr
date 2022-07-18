/**
 * @jest-environment jsdom
 */

import React, {forwardRef} from 'react'
import {render, fireEvent, act} from '@testing-library/react'
import useTaroHoverableEvents from '@taror/components/lib/_util/hooks/useTaroHoverableEvents'
import {TaroHoverableProps} from '@taror/components/lib/_util/typings'

type TestComponentProps = TaroHoverableProps

const TestComponentInternal: React.ForwardRefRenderFunction<HTMLDivElement, TestComponentProps> = (
    {children, ...rest},
    ref
) => {
    const props = useTaroHoverableEvents(rest, 'hovered')
    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    )
}
const TestComponent = forwardRef(TestComponentInternal)

describe('useTaroHoverableEvents', () => {
    beforeAll(() => {
        jest.useFakeTimers()
    })

    let ref = React.createRef<HTMLDivElement>()

    const handleParentTouchStart = jest.fn()
    const handleParentTouchEnd = jest.fn()
    const handleParentClick = jest.fn()
    const handleParentLongPress = jest.fn()

    beforeEach(() => {
        render(
            <TestComponent
                ref={ref}
                hoverClass='hovered'
                onTouchStart={handleParentTouchStart}
                onTouchEnd={handleParentTouchEnd}
                onClick={handleParentClick}
                onLongPress={handleParentLongPress}
            />
        )
    })

    afterEach(() => {
        ref = React.createRef<HTMLDivElement>()

        handleParentTouchStart.mockClear()
        handleParentTouchEnd.mockClear()
        handleParentClick.mockClear()
        handleParentLongPress.mockClear()
    })

    it('basic events', () => {
        fireEvent.mouseDown(ref.current)
        fireEvent.mouseUp(ref.current)
        fireEvent.click(ref.current)
        expect(handleParentTouchStart.mock.calls.length).toBe(1)
        expect(handleParentTouchEnd.mock.calls.length).toBe(1)
        expect(handleParentClick.mock.calls.length).toBe(1)
        expect(handleParentLongPress.mock.calls.length).toBe(0)
    })

    it('hover class', async () => {
        expect(ref.current.className).toBe('')
        fireEvent.mouseDown(ref.current)
        act(() => {
            jest.runOnlyPendingTimers()
        })
        expect(ref.current.className).toBe('hovered')
        fireEvent.mouseUp(ref.current)
        act(() => {
            jest.runOnlyPendingTimers()
        })
        expect(ref.current.className).toBe('')
    })
})
