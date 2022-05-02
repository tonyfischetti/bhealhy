
import 'dotenv/config';
import chalk from 'chalk';

function defaultTask(cb) {
  console.log(chalk.cyanBright("Hi from Gulp!"));
  cb();
}

exports.default = defaultTask;
