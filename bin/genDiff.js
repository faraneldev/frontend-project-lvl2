#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .version('0.1.0')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    console.log(genDiff(filepath1, filepath2, format));
  });

program.parse();
