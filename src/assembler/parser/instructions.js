import { buildWithPrimitives } from './primitives'

export default {
  mov: buildWithPrimitives('(?<from>{{IO}}){{separator}}(?<to>{{IO}})'),
  add: buildWithPrimitives('(?<value>{{IO}})'),
  jmp: buildWithPrimitives('(?<goto>{{label}})'),
  slp: buildWithPrimitives('(?<duration>{{IO}})'),
  teq: buildWithPrimitives('(?<eq_lhs>{{IO}}){{separator}}(?<eq_rhs>{{IO}})'),
  tgt: buildWithPrimitives('(?<gt_lhs>{{IO}}){{separator}}(?<gt_rhs>{{IO}})'),
  tge: buildWithPrimitives('(?<ge_lhs>{{IO}}){{separator}}(?<ge_rhs>{{IO}})'),
}
