#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0');

program.parse();