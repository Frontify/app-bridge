/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from './package.json';
import { resolve } from 'path';

const dependencies = Object.keys(dependenciesMap);
const peerDependencies = Object.keys(peerDependenciesMap);

export const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
};

export default defineConfig({
    plugins: [react(), dts({ insertTypesEntry: true })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: (format: string) => `index.${format}.js`,
            formats: ['es', 'umd', 'cjs'],
            name: 'AppBridge',
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: [...dependencies, ...peerDependencies],
            output: {
                globals,
            },
        },
    },
});
