import parse from './parser'
import run from './runner'

export default (program, maxCycles) => run(parse(program), maxCycles)
