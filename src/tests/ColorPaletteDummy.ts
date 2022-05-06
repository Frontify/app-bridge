/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPalette } from '../types';
import { ColorDummy } from './ColorDummy';

export class ColorPaletteDummy {
    static with(id: number, name = 'Example Colors'): ColorPalette {
        return {
            id,
            name,
            colors: [ColorDummy.red(), ColorDummy.yellow(), ColorDummy.green()],
        };
    }
}
