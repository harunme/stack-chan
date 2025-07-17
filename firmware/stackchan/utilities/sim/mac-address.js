import Net from 'net'

function getMacAddress() {
  return Net.get('MAC')
}
export default getMacAddress
