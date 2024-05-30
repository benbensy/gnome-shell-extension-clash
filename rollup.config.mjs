import { defineConfig } from 'rollup'

import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import copy from 'rollup-plugin-copy'
import conditionalExec from 'rollup-plugin-conditional-exec'

function matchExternal(options) {
    return {
        name: 'match-external-plugin',
        resolveId(src) {
            const [] = []
            let matched = false
            options.matches.forEach((regxp) => {
                if (regxp.test(src)) {
                    matched = true
                }
            })

            if (matched) {
                return {
                    id: src,
                    external: true,
                }
            }
            return null
        },
    }
}

const config = defineConfig(() => {
    const commonPlugins = [
        commonjs({
            sourceMap: false,
        }),
        nodeResolve({
            preferBuiltins: false,
        }),
        typescript({
            check: false,
        }),
        tsConfigPaths(),
        matchExternal({
            matches: [/^gi:\/\/*/, /^resource:\/\/\/*/],
        }),
    ]

    return [
        {
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
                        {
                            src: 'src/schemas/org.gnome.shell.extensions.clash.gschema.xml',
                            dest: 'dist/schemas',
                        },
                    ],
                }),
                conditionalExec({
                    command: 'glib-compile-schemas dist/schemas/',
                }),
            ],
        },
        {
            input: 'src/prefs.ts',
            output: {
                dir: 'dist',
                format: 'es',
                name: '[name].js',
            },
            plugins: [...commonPlugins],
        },
    ]
})

export default config
