#!/usr/bin/env node

import { Command } from 'commander';

import  gendiff from '../src/index.js';

const program = new Command;

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format <type>', 'output usage information')
    .argument('<filepath1>', 'path to file one')
    .argument('<filepath2>', 'path to file two')
    .action((filepath1, filepath2) => {
        const option = program.opts();
        console.log(gendiff(filepath1, filepath2, option.format));
  });

program.parse(process.argv);  