const getUser = () => window.localStorage.getItem("xyz")
const saveUser = (user) =>
  window.localStorage.setItem("xyz", JSON.stringify(user))
const removeUser = () => window.localStorage.removeItem("xyz")

export default { getUser, saveUser, removeUser }
