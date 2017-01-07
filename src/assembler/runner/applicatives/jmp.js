export default (instruction, proc) => {
  const label = instruction.goto
  proc.comparison = null
  proc.line = proc.labels[label] - 1
}
