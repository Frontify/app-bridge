/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';
import { compareObjects, isObject, mergeDeep } from './object';

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

describe('isObject', () => {
    test('should return true if object', () => {
        expect(isObject({})).toBeTruthy();
    });

    test('should return false if array', () => {
        expect(isObject([])).toBeFalsy();
    });

    test('should return false if null', () => {
        expect(isObject(null)).toBeFalsy();
    });

    test('should return false if undefined', () => {
        expect(isObject(undefined)).toBeFalsy();
    });

    test('should return false if number', () => {
        expect(isObject(1)).toBeFalsy();
    });

    test('should return false if string', () => {
        expect(isObject('string')).toBeFalsy();
    });

    test('should return false if boolean', () => {
        expect(isObject(false)).toBeFalsy();
    });
});

describe('mergeDeep', () => {
    test('should return object if only one object', () => {
        expect(mergeDeep({ a: 1 })).toEqual({ a: 1 });
    });

    test('should return object if two objects', () => {
        expect(mergeDeep({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    test('should merge one level nested object', () => {
        expect(mergeDeep({ a: { b: 1 } }, { a: { c: 2 } })).toEqual({ a: { b: 1, c: 2 } });
    });

    test('should merge two level nested object', () => {
        expect(mergeDeep({ a: { b: { c: 2 } } }, { a: { d: 3 } })).toEqual({
            a: { b: { c: 2 }, d: 3 },
        });
    });
});
