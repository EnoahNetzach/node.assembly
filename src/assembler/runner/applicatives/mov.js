import getValueOrAddress from '../../parser/getValueOrAddress'

export default (instruction, proc) => {
  const from = getValueOrAddress(instruction.from)
  const value = parseInt(from.value, 10) || proc.addresses[from.address].get()
  proc.addresses[instruction.to].set(value)
}
