import { PWMServoDriver } from 'sg90-driver'

const driver = new PWMServoDriver({
  pwmPan: 16,
  pwmTilt: 17,
})

driver.applyRotation({
  r: 0,
  p: 0,
  y: 0,
})
