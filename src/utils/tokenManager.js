export const clearToken = (vc) => {
  vc.$store.commit('RECEIVE_USERNAME', '')
  vc.$store.commit('RECEIVE_EXPIRE', '')
  localStorage.removeItem('username')
  localStorage.removeItem('token')
  localStorage.removeItem('expireTime')
}

export const addToken = (vc, username) => {
  localStorage.setItem('username', username)
  let expireDays = 1000 * 60 * 60 * 24 * 3;
  const expireTime = Date.now() + expireDays;
  vc.$store.commit('RECEIVE_USERNAME', username)
  vc.$store.commit('RECEIVE_EXPIRE', expireTime)  // number
  localStorage.setItem('expireTime', expireTime.toString())
}

export const checkToken = (username, expireTime) => {
  if (username === undefined || username === null || username === '')
    return false
  if (expireTime * 1 <= Date.now())
    return false
  return true
}

export const loadToken = (vc) => {
  const expireTime = localStorage.getItem('expireTime')
  if (expireTime === null || expireTime * 1 <= Date.now()) {
    localStorage.removeItem('expireTime')
    localStorage.removeItem('username')
    return
  }
  const localUsername = localStorage.getItem('username')
  if (localUsername === null) return
  vc.$store.commit('RECEIVE_USERNAME', localUsername)
  vc.$store.commit('RECEIVE_EXPIRE', expireTime)
}