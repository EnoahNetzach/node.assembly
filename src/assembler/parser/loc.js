import xRegExp from 'xregexp'
import primitives, { buildWithPrimitives } from './primitives'
import instructions from './instructions'

const prefix = buildWithPrimitives('(?<label>{{label}}):|(?<then>{{then}})|(?<else>{{else}})')
const name = Object.keys(instructions).join('|')
const instruction = buildWithPrimitives(
  Object.keys(instructions).map(key => `(?:${key}{{separator}}{{${key}}})`).join('|'),
  instructions,
)
const body = buildWithPrimitives('(?=(?<name>{{name}}){{separator}}){{instruction}}', { name, instruction })

const loc = '(?<comment>{{comment}})|(?:{{prefix}}){0,1}{{separator}}*(?:{{body}}|(?<empty>{{separator}}*{{nl}}*))'

export default xRegExp.build(loc, {
  ...primitives,
  body,
  instruction,
  prefix,
})
