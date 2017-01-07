import chalk from 'chalk'
import applicatives from './applicatives'

const scheduler = global.requestIdleCallback || (fn => setTimeout(fn, 0))

export default (parsed, maxCycles) => processor => {
  processor.labels = parsed.reduce((carry, [_, { label }], line) => (label ? { ...carry, [label]: line } : carry), {})

  let cycle = 1
  const run = () => {
    if (cycle > maxCycles) {
      console.warn(
        '%s %s %s %s',
        chalk.yellow.bold('■'),
        chalk.yellow('Execution halted because it reached'),
        chalk.yellow.bold(maxCycles),
        chalk.yellow('max cycles'),
      )
      return
    }

    if (processor.sleep > 0) {
      console.info(
        '%s %s %s %s [%s]',
        chalk.blue.bold('😴'),
        chalk.blue('Sleeping for'),
        chalk.blue.bold(processor.sleep - 1),
        chalk.blue(`more cycle${processor.sleep > 1 ? 's' : ''}`),
        chalk.gray.bold(cycle),
      )
      processor.sleep--
      cycle++
      return scheduler(run)
    }

    if (processor.line === 0) {
      processor.comparison = null
    }

    const [code, instruction] = parsed[processor.line]

    const isComment = instruction.comment
    const isEmpty = typeof instruction.empty !== 'undefined'
    const isComparing = processor.comparison !== null && (instruction.then || instruction.else)
    const comparison = (processor.comparison && instruction.then) || (!processor.comparison && instruction.else)

    const shouldRunLine = !isComment && !isEmpty && (isComparing ? comparison : true)

    console.log(
      '%s L%d "%s" [%s %s %s]',
      chalk.bold(`#`),
      processor.line,
      chalk.magenta(code),
      (shouldRunLine ? chalk.green : chalk.red).bold(shouldRunLine ? '✔' : '✘'),
      ((!isComparing && chalk.yellow) || (comparison ? chalk.green : chalk.red)).bold
        ((processor.comparison === null && '•') || (processor.comparison ? '➕' : '➖')),
      chalk.gray.bold(cycle),
    )
    console.time(`${chalk.cyan.bold('⏱')} ${chalk.cyan('instruction')}`)

    if (shouldRunLine) {
      try {
        applicatives[instruction.name](instruction, processor)
      } catch (err) {
        throw new Error(`Error at line ${processor.line}: "${code}"\n${err.message}`)
      }
    }

    console.log(
      '\t%s: { %s }',
      chalk.gray('addresses'),
      Object.keys(processor.addresses).map(
        key => [chalk.cyan(key), chalk.cyan.bold(processor.addresses[key].get())].join(': '),
      ).join(' '),
    )

    console.timeEnd(`${chalk.cyan.bold('⏱')} ${chalk.cyan('instruction')}`)

    if (++processor.line === parsed.length) {
      processor.line = 0
      cycle++
    }

    return scheduler(run)
  }


  return scheduler(run)
}
