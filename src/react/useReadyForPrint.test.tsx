import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useReadyForPrint } from './useReadyForPrint';

const IS_READY_CONTAINER = 'isReadyContainer';
const SET_TO_FALSE_BUTTON = 'setToFalseButton';
const SET_TO_TRUE_BUTTON = 'setToTrueButton';
const IS_READY_FOR_PRINT = 'is ready for print';
const IS_NOT_READY_FOR_PRINT = 'is not ready for print';

const ReadyForPrintDummy = ({ missingContainer = false }) => {
    const { containerRef, isReadyForPrint, setIsReadyForPrint } = useReadyForPrint();

    return (
        <div data-testid={IS_READY_CONTAINER} className="mod block" data-ready="true">
            <div ref={missingContainer ? null : containerRef}>
                {(isReadyForPrint && IS_READY_FOR_PRINT) || IS_NOT_READY_FOR_PRINT}
                <button data-testid={SET_TO_FALSE_BUTTON} onClick={() => setIsReadyForPrint(false)} />
                <button data-testid={SET_TO_TRUE_BUTTON} onClick={() => setIsReadyForPrint(true)} />
            </div>
        </div>
    );
};

describe('useReadyForPrint hook', () => {
    test('Should read the data-ready attribute and set the value', () => {
        render(<ReadyForPrintDummy />);

        const container = screen.getByTestId(IS_READY_CONTAINER);

        expect(container.getAttribute('data-ready')).toBe('true');
        expect(screen.getByText(IS_READY_FOR_PRINT)).toBeDefined;
        cleanup();
    });

    test('Should change data-ready', () => {
        render(<ReadyForPrintDummy />);

        const setToFalseButton = screen.getByTestId(SET_TO_FALSE_BUTTON);
        const setToTrueButton = screen.getByTestId(SET_TO_TRUE_BUTTON);
        const container = screen.getByTestId(IS_READY_CONTAINER);

        fireEvent.click(setToFalseButton);

        expect(container.getAttribute('data-ready')).toBe('false');
        expect(screen.getByText(IS_NOT_READY_FOR_PRINT)).toBeDefined;

        fireEvent.click(setToTrueButton);

        expect(container.getAttribute('data-ready')).toBe('true');
        expect(screen.getByText(IS_READY_FOR_PRINT)).toBeDefined;
        cleanup();
    });

    test('Should be ready without container', () => {
        render(<ReadyForPrintDummy missingContainer={true} />);

        const container = screen.getByTestId(IS_READY_CONTAINER);

        expect(container.getAttribute('data-ready')).toBe('true');
        cleanup();
    });
});
