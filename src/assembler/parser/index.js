import xRegExp from 'xregexp'
import primitives from './primitives'
import lineOfCode from './loc'

export default raw => raw.split(primitives.nl)
  .filter(a => a)
  .map(loc => [loc, xRegExp.exec(loc.trim(), xRegExp.build('(?x)^{{lineOfCode}}$', { lineOfCode }))])
  .map(([code, instruction], line) => {
    if (!instruction) {
      throw new Error(`Syntax Error at line ${line}: "${code}"`)
    }

    return [code, instruction]
  })
