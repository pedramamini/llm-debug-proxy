
import { startServer } from './api';
import { getCliOptions } from './cli';

const cliOptions = getCliOptions();

startServer({ cliOptions });