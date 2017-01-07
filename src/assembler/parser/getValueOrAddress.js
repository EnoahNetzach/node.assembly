import xRegExp from 'xregexp'
import primitives from './primitives'

export default entry => xRegExp.exec(entry, xRegExp.build(
  '(?<value>{{number}})|(?<address>{{null}}|{{analog}}|{{digital}}|{{special}})',
  primitives,
))
