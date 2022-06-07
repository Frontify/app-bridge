/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { compareObjects } from './object';

describe('compareObjects', () => {
    test.each([
        [
            { a: 1, b: 2 },
            { a: 1, b: 2 },
        ],
        [
            { b: 2, a: 1 },
            { a: 1, b: 2 },
        ],
        [{ a: { b: 2 } }, { a: { b: 2 } }],
        [
            { a: { b: 2 }, c: 3 },
            { a: { b: 2 }, c: 3 },
        ],
        [
            { c: 3, a: { b: 2 } },
            { a: { b: 2 }, c: 3 },
        ],
    ])('should return true if objects are equal', (obj1, obj2) => {
        expect(compareObjects(obj1, obj2)).toBeTruthy();
    });

    test.each([
        [
            { a: 1, b: 0, c: 3 },
            { a: 1, b: 2, c: 3 },
        ],
        [
            { a: 1, b: 2, c: 3 },
            { a: 1, b: 2, c: 4 },
        ],
        [
            { a: 1, b: 2, c: 3 },
            { a: 1, b: 2, c: 3, d: 4 },
        ],
        [
            { a: 1, b: 2, c: 3, d: 4, e: 5 },
            { a: 1, b: 2, c: 3 },
        ],
        [
            { a: 1, b: 2, c: 3 },
            { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 },
        ],
    ])('should return false if objects are not equal', (obj1, obj2) => {
        expect(compareObjects(obj1, obj2)).toBeFalsy();
    });
});
