import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { startServer } from './api';

// Parse CLI arguments using yargs
const argv = yargs(hideBin(process.argv))
  .option('raw', {
    type: 'boolean',
    default: false,
    description: 'Output raw response data instead of formatting it'
  })
  .option('omit-tools', {
    type: 'boolean',
    default: false,
    description: 'Omit the "tools" property from the request output'
  })
  .parseSync();

startServer({ rawOutput: argv.raw, omitTools: argv.omitTools });