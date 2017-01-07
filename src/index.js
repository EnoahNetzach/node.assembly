import 'babel-polyfill'
import chalk from 'chalk'
import createProcessor from './assembler/processor'
import Stream from './assembler/processor/stream'
import assembler from './assembler'

const processor = createProcessor({
  null: new Stream(0),
  acc: new Stream(inst => inst.value || 0, (inst, value) => { inst.value = value }),
  dat: new Stream(inst => inst.value || 0, (inst, value) => { inst.value = value }),
  x0: new Stream(1),
  x1: new Stream(1),
})

export default (input, maxCycles) => {
  console.log(chalk.magenta(`-----\n${input.trim()}\n-----`))

  console.time(`${chalk.cyan.bold('⏱')} ${chalk.cyan('assembler')}`)
  assembler(input, maxCycles)(processor)
  console.timeEnd(`${chalk.cyan.bold('⏱')} ${chalk.cyan('assembler')}`)
}
