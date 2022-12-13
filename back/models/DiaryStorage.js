const db = require("../config/db");

class DiaryStorage {
  static save(diary) { // 다이어리 저장
    return new Promise((resolve, reject) => { // Promise 객체 생성
      const query = "INSERT INTO diary(id, title, question, content, weather, mood, writetime, date) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
      db.query(query, [diary.id, diary.title, diary.question, diary.content, diary.weather, diary.mood, diary.time, diary.date], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }

  static read(id) { // 다이어리 읽기
    return new Promise((resolve, reject) => { // Promise 객체 생성
      const query = "SELECT * FROM diary WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = DiaryStorage;
