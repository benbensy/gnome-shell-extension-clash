import { defineConfig } from 'rollup'

import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import copy from 'rollup-plugin-copy'

const config = defineConfig(() => {
    const commonPlugins = [nodeResolve(), commonjs(), typescript(), tsConfigPaths()]

    return {
        input: 'src/extension.ts',
        output: {
            dir: 'dist',
            format: 'es',
            name: '[name].js',
        },
        plugins: [
            ...commonPlugins,
            copy({
                targets: [
                    {
                        src: 'src/metadata.json',
                        dest: 'dist',
                    },
                    {
                        src: 'src/locale',
                        dest: 'dist',
                    },
                    {
                        src: 'src/stylesheet.css',
                        dest: 'dist',
                    },
                ],
            }),
        ],
    }
})

export default config
