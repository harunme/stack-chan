import calculatePower from 'calculate-power'

const threshold = 150
export function onRobotCreated(robot) {
  const microphone = robot.microphone

  microphone.onReadable = function (size) {
    const sampleCount = size / 2
    const samples = new Int16Array(sampleCount)
    this.read(samples.buffer)

    const power = calculatePower(samples.buffer)
    robot.setMouseOpen(Math.min(power / threshold, 1.0))
  }

  microphone.start()
}
