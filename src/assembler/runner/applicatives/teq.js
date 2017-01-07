import getValueOrAddress from '../../parser/getValueOrAddress'

export default (instruction, proc) => {
  const lhs = getValueOrAddress(instruction.eq_lhs)
  const fromValue = parseInt(lhs.value, 10) || proc.addresses[lhs.address].get()
  const rhs = getValueOrAddress(instruction.eq_rhs)
  const toValue = parseInt(rhs.value, 10) || proc.addresses[rhs.address].get()

  proc.comparison = fromValue === toValue
}
