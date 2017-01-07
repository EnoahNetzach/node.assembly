import xRegExp from 'xregexp'

const primitives = {
  number: /(?:\+|-)?\d+/,
  null: /null/,
  separator: /\s+/,
  nl: /\n/,
  comment: /\#.*/, // eslint-disable-line no-useless-escape
  label: /\w[\w\d]{2}/,
  analog: /d\d/,
  digital: /x\d/,
  special: /\w{3,4}/,
  then: /\+/,
  else: /-/,
}

export const buildWithPrimitives = (source, definitions = {}) => xRegExp.build(
  source,
  { ...primitives, ...definitions },
)

primitives.IO = buildWithPrimitives('{{number}}|{{null}}|{{analog}}|{{digital}}|{{special}}')

export default { ...primitives }
