import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const auth = await AsyncStorage.getItem(`${this.namespace}:auth`);
    return auth ? auth : "";
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(`${this.namespace}:auth`, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:auth`);
  }
}

export default AuthStorage;
