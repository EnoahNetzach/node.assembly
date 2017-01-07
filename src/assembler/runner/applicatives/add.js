import getValueOrAddress from '../../parser/getValueOrAddress'

export default (instruction, proc) => {
  const add = getValueOrAddress(instruction.value)
  const value = parseInt(add.value, 10) || proc.addresses[add.address].get()
  proc.addresses.acc.set(proc.addresses.acc.get() + value)
}
