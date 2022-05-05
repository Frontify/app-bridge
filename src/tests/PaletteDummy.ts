/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ColorPalette } from '../types';

export class PaletteDummy {
    static get palette(): ColorPalette[] {
        return [
            {
                id: 331,
                name: 'Example Colors',
                colors: [
                    {
                        id: 767,
                        name: 'Red',
                        name_css: 'red',
                        r: 237,
                        g: 0,
                        b: 7,
                        hex: 'ed0007',
                        hue: '361',
                        saturation: '100',
                        lightness: '46',
                        type: 'SOLID',
                        opacity: 100,
                        opacity_css: 1,
                        css: 'background: rgb(237,0,7);',
                        css_value: 'rgb(237,0,7)',
                        css_value_hex: '#ed0007',
                        prefix: '$',
                    },
                    {
                        id: 768,
                        name: 'Yellow',
                        name_css: 'yellow',
                        r: 255,
                        g: 207,
                        b: 0,
                        hex: 'ffcf00',
                        hue: '48',
                        saturation: '100',
                        lightness: '50',
                        type: 'SOLID',
                        opacity: 100,
                        opacity_css: 1,
                        css: 'background: rgb(255,207,0);',
                        css_value: 'rgb(255,207,0)',
                        css_value_hex: '#ffcf00',
                        prefix: '$',
                    },
                    {
                        id: 769,
                        name: 'Green',
                        name_css: 'green',
                        r: 82,
                        g: 161,
                        b: 71,
                        hex: '52a147',
                        hue: '112',
                        saturation: '38',
                        lightness: '45',
                        type: 'SOLID',
                        opacity: 100,
                        opacity_css: 1,
                        css: 'background: rgb(82,161,71);',
                        css_value: 'rgb(82,161,71)',
                        css_value_hex: '#52a147',
                        prefix: '$',
                    },
                ],
            },
        ];
    }
}
