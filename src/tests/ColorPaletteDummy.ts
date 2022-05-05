/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPalette } from '../types';
import { ColorDummy } from './ColorDummy';

export class ColorPaletteDummy {
    static withDefaults(): ColorPalette[] {
        return [
            {
                id: 331,
                name: 'Example Colors',
                colors: [ColorDummy.red, ColorDummy.yellow, ColorDummy.green],
            },
        ];
    }
}
