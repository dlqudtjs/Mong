const UserStorage = require("./UserStorage");

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;

    try {
      if ((await UserStorage.getUserInfo(client.id)) === undefined) {
        return { success: false, msg: "존재하지 않는 아이디입니다." };
      }

      const { id, psword } = await UserStorage.getUserInfo(client.id);

      if (id === client.id && psword === client.psword) {
        return { success: true, msg: "로그인 성공" };
      }
      return { success: false, msg: "비밀번호가 틀렸습니다." };
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async register() {
    const client = this.body;

    try {
      if ((await UserStorage.getUserInfo(client.id)) !== undefined) {
        return { success: false, msg: "이미 존재하는 아이디입니다." };
      }
      await UserStorage.save(client);
      return { success: true, msg: "회원가입 성공" };
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = User;
