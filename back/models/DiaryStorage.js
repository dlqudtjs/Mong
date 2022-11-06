const db = require("../config/db");

class DiaryStorage {
  static save(diary) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO diary(id, title, question, content, weather, mood, writetime, date) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
      db.query(query, [diary.id, diary.title, diary.question, diary.content, diary.weather, diary.mood, diary.time, diary.date], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }

  static read(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM diary WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  }
}

module.exports = DiaryStorage;
