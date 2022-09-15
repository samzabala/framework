#!/usr/bin/env node

/*!
 * todo.. make this work
 */

'use strict';

const path = require('path');
const rollup = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const banner = require('./banner.js');

const plugins = [
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
  }),
  resolve({
    browser: true,
    modulesOnly: true,
  }),
];
const fwComponents = {
  Accordion: path.resolve(__dirname, '../src/js/imports/accordion.js'),
  Alert: path.resolve(__dirname, '../src/js/imports/alert.js'),
  Button: path.resolve(__dirname, '../src/js/imports/button.js'),
  Dropdown: path.resolve(__dirname, '../src/js/imports/dropdown.js'),
  Form: path.resolve(__dirname, '../src/js/imports/form.js'),
  Lazy: path.resolve(__dirname, '../src/js/imports/lazy.js'),
  ListGroup: path.resolve(__dirname, '../src/js/imports/listGroup.js'),
  Modal: path.resolve(__dirname, '../src/js/imports/modal.js'),
};
const rootPath = path.resolve(__dirname, '../js/dist/');

const build = async (plugin) => {
  console.log(`Building ${plugin} plugin...`);

  const { external, globals } = getConfigByPluginKey(plugin);
  const pluginFilename = path.basename(fwComponents[plugin]);
  let pluginPath = rootPath;

  //@TODO do the thing

  console.log(`Building ${plugin} plugin... Done!`);
};

const main = async () => {
  try {
    await Promise.all(Object.keys(fwComponents).map((plugin) => build(plugin)));
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

main();
