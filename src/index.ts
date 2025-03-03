import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { startServer } from './api';

// Parse CLI arguments using yargs
const argv = yargs(hideBin(process.argv))
  .option('raw', {
    alias: 'r',
    type: 'boolean',
    default: false,
    description: 'Output raw request and response data'
  })
  .parseSync();

startServer({ rawOutput: argv.raw })