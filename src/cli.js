import { prompt } from 'inquirer'
import assembler from '.'

const answers = [{
  default: 1,
  name: 'maxCycles',
  message: 'Max cycles',
  validate: input => parseInt(input, 10) && !Number.isNaN(parseInt(input, 10)),
}, {
  name: 'code',
  message: 'Write some code',
  type: 'editor',
}]

prompt(answers).then(({ code, maxCycles }) => assembler(code, parseInt(maxCycles, 10)))
