import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

export default {
	input: 'src/js/framework.lib.js',
	output: {
		name: 'fw',
		file: 'dist/js/framework.lib.js',
		format: 'umd',
		sourcemap: true,
	},
	moduleContext: {
		this: 'window'
	},
	onwarn: function(warning) {
		// Skip certain warnings
		// should intercept ... but doesn't in some rollup versions
		if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
		// console.warn everything else
		console.warn( warning.message );
	},
	plugins: [
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'bundled'
		}),
		resolve({
			browser: true,
			modulesOnly: true
		}),
		copy({
			targets: [
				//fonts
					//symbols
					{ src: ['src/fonts/fw-icons/*', '!**/*.(txt|ai|otf)'], dest: 'dist/fonts/fw-icons' },
				//legacy js
					{ src: 'src/js/framework.legacy.js', dest: 'dist/js' },
					{ src: 'src/js/framework.legacy.plugged.js', dest: 'dist/js' }
			],
			copyOnce: true
		  })
	]
};