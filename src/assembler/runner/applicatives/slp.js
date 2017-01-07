import getValueOrAddress from '../../parser/getValueOrAddress'

export default (instruction, proc) => {
  const duration = getValueOrAddress(instruction.duration)
  proc.sleep = parseInt(duration.value, 10) || proc.addresses[duration.address].get()
}
