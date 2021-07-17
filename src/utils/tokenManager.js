import vm from "@/main";

export const clearToken = () => {
  vm.$store.commit('RECEIVE_USERNAME', '')
  localStorage.removeItem('username')
  localStorage.removeItem('token')
  localStorage.removeItem('expireTime')
}

export const addToken = (username) => {
  localStorage.setItem('username', username)
  let expireDays = 1000 * 60 * 60 * 24 * 3;
  const expireTime = Date.now() + expireDays;
  vm.$store.commit('RECEIVE_USERNAME', username)
  localStorage.setItem('expireTime', expireTime.toString())
}

export const loadToken = () => {
  const expireTime = localStorage.getItem('expireTime')
  if (expireTime === null || expireTime * 1 <= Date.now()) {
    localStorage.removeItem('expireTime')
    localStorage.removeItem('username')
    return
  }
  const localUsername = localStorage.getItem('username')
  if (localUsername === null) return
  vm.$store.commit('RECEIVE_USERNAME', localUsername)
}