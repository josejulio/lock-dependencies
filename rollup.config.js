import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const extensions = [ '.js', '.ts' ];

const config = [
    {
        input: 'src/main.ts',
        output: [
            {
                file: 'lib/main.js',
                format: 'cjs',
                banner: '#!/usr/bin/env node'
            }
        ],
        external: [
            'fs', 'child_process', 'path', 'readline', 'os', 'pacote', 'events', 'util'
        ],
        plugins: [
            json(),
            typescript({
                sourceMap: false,
                declaration: false,
                allowSyntheticDefaultImports: true
            }),
            resolve({
                extensions,
                preferBuiltins: false
            }),
            commonjs({
                include: /node_modules/
            })
        ]
    }
];

export default config;
