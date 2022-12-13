const DiaryStorage = require("./DiaryStorage");

class Diary {
  constructor(body) {
    this.body = body;
  }

  async write() {
    const diary = this.body;

    try {
      if ((await DiaryStorage.save(diary)) === undefined) { // 다이어리 저장 실패
        return { success: false, msg: "다이어리 저장 실패" };
      }
      return { //다이어리 저장 성공
        success: true, 
        msg: "다이어리 저장 성공",
      };
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async read() {
    const diary = this.body;

    try {
      const data = await DiaryStorage.read(diary.id);
      if (data === undefined) { // 다이어리 읽기 실패
        return { success: false, msg: "다이어리 읽기 실패" };
      }
      return { // 다이어리 읽기 성공
        diaryList: data,
        success: true,
        msg: "다이어리 읽기 성공",
      };
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Diary;
