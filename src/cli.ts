import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export type CliOptions = {
  raw: boolean;
  tools: 'none' | 'name' | 'all';
};

export function getCliOptions() {
  return yargs(hideBin(process.argv))
    .option('raw', {
      type: 'boolean',
      default: false,
      description: 'Output raw response data instead of formatting it',
    })
    .option('tools', {
      type: 'string',
      choices: ['none', 'name', 'all'],
      default: 'name',
      description:
        'Specify how to display tool information in the request body. Options: none, name, all',
    })
    .parseSync() as CliOptions;
}
