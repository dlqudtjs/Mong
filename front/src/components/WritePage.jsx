import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import React from "react";
import Slider from "@mui/material/Slider";
import "../css/WritePage.scoped.css";

const questions = [
  "오늘 하루는 어땠나요?",
  "뿌듯한 일이 있었나요?",
  "특별한 일이 생겼나요?",
  "재밌는 일이 있었나요?",
  "행복한 일이 있었나요?",
  "후회한 일이 있었나요?",
  "아쉬운 일이 있었나요?",
  "속상한 일이 있었나요?",
];

//시계 컴포넌트
class Flipper {
  constructor(node, currentTime, nextTime) {
    this.isFlipping = false;
    this.duration = 600;
    this.flipNode = node;
    this.frontNode = node.querySelector(".front");
    this.backNode = node.querySelector(".back");
    this.setFrontTime(currentTime);
    this.setBackTime(nextTime);
  }
  setFrontTime(time) {
    this.frontNode.dataset.number = time;
  }
  setBackTime(time) {
    this.backNode.dataset.number = time;
  }
  flipDown(currentTime, nextTime) {
    if (this.isFlipping) {
      return false;
    }
    this.isFlipping = true;
    this.setFrontTime(currentTime);
    this.setBackTime(nextTime);
    this.flipNode.classList.add("running");
    setTimeout(() => {
      this.flipNode.classList.remove("running");
      this.isFlipping = false;
      this.setFrontTime(nextTime);
    }, this.duration);
  }
}

const getTimeFromDate = (date) =>
  date
    .toTimeString()
    .slice(0, 8)
    .split(":")
    .join("");

const Clock = () => {
  const refresh = () => {
    let now = new Date();
    let nowTimeStr = getTimeFromDate(new Date(now.getTime() - 1000));
    let nextTimeStr = getTimeFromDate(now);
    let flips = document.querySelectorAll(".flip");
    let flippers = Array.from(flips).map((flip, i) => new Flipper(flip, nowTimeStr[i], nextTimeStr[i]));
    for (let i = 0; i < flippers.length; i++) {
      if (nowTimeStr[i] === nextTimeStr[i]) {
        continue;
      }
      flippers[i].flipDown(nowTimeStr[i], nextTimeStr[i]);
    }
  };
  refresh();
  const i = setInterval(refresh, 1000);

  useEffect(() => {
    //컴포넌트가 파괴 될 때
    return () => clearInterval(i);
  });

  return (
    <div className="clock">
      <div className="flip">
        <div className="digital front" data-number="0" />
        <div className="digital back" data-number="1" />
      </div>
      <div className="flip">
        <div className="digital front" data-number="0" />
        <div className="digital back" data-number="1" />
      </div>
      <em className="divider">:</em>
      <div className="flip">
        <div className="digital front" data-number="0" />
        <div className="digital back" data-number="1" />
      </div>
      <div className="flip">
        <div className="digital front" data-number="0" />
        <div className="digital back" data-number="1" />
      </div>
      <em className="divider">:</em>
      <div className="flip">
        <div className="digital front" data-number="0" />
        <div className="digital back" data-number="1" />
      </div>
      <div className="flip">
        <div className="digital front" data-number="0" />
        <div className="digital back" data-number="1" />
      </div>
    </div>
  );
};

//value를 mood로 변환
const valueToMood = (value) => {
  if (value <= 20) return "bad";
  if (value <= 40) return "sad";
  if (value <= 60) return "soso";
  if (value <= 80) return "happy";
  if (value <= 100) return "great";
};

//mood를 그림으로 변환
const drawMood = (value) => {
  const mood = new Map([["bad", "😠"], ["sad", "😢"], ["soso", "😐"], ["happy", "😏"], ["great", "😁"]]);
  document.getElementById("mood").innerHTML = mood.get(valueToMood(value));
};

function WritePage() {
  const location = useLocation(); //location 객체는 현재 페이지의 주소 정보를 가지고 있다.
  const history = useHistory(); //history는 뒤로가기, 앞으로가기, 새로고침, 이동 등을 할 수 있게 해준다.
  const id = location.state.id; //id 받아오기

  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryQuestion, setDiaryQuestion] = useState(questions[Math.floor(Math.random() * questions.length)]);
  const [diaryContent, setDiaryContent] = useState("");
  const [diaryWeather, setDiaryWeather] = useState("");
  const [diaryTime, setDiaryTime] = useState("");
  const [diaryMood, setDiaryMood] = useState("soso");

  const onChangeTitle = (e) => {
    setDiaryTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    checkContentLine(e);
    setDiaryContent(e.target.value);
  };

  const onChangeDiaryWeather = (e) => {
    setDiaryWeather(e.target.value);
  };

  const onChangeDiaryTime = (e) => {
    setDiaryTime(e.target.value);
  };

  const onChangeDiaryMood = (e) => {
    setDiaryMood(valueToMood(e.target.value));
    drawMood(e.target.value);
  };

  //랜덤 질문 생성
  function RandomQuestion() {
    const setQuestionRandom = () => {
      setDiaryQuestion(questions[Math.floor(Math.random() * questions.length)]);
    };

    return (
      <div>
        <Button className="randomQuestionBtn" onClick={setQuestionRandom}>
          랜덤 질문
        </Button>
        <div className="questionString">{diaryQuestion}</div>
      </div>
    );
  }

  //줄 수 제한
  const checkContentLine = (e) => {
    let content = e.target.value;
    let contentLine = content.split("\n");
    if (contentLine.length > 10) {
      alert("10줄 이상 입력할 수 없습니다.");
      setDiaryContent(contentLine.slice(0, 10).join("\n"));
    }
  };

  //저장 시 놓친 입력값 확인
  const submitCheck = () => {
    if (diaryTitle === "") {
      alert("제목을 입력해주세요.");
      return false;
    }
    if (diaryContent === "") {
      alert("내용을 입력해주세요.");
      return false;
    }
    if (diaryWeather === "") {
      alert("날씨를 선택해주세요.");
      return false;
    }
    if (diaryTime === "") {
      alert("시간을 선택해주세요.");
      return false;
    }
    if (diaryMood === "") {
      alert("기분을 선택해주세요.");
      return false;
    }

    return true;
  };

  const onClickSubmit = () => {
    if (!submitCheck()) {
      //입력값 확인
      return;
    }

    let date = new Date(+new Date() + 3240 * 10000) //한국시간으로 바꿔주기
      .toISOString()
      .replace("T", " ") //T를 공백으로 바꿔주기
      .replace(/\..*/, ""); //2021-10-01 00:00:00

    axios //axios로 서버에 데이터 전송
      .post("http://localhost:5000/write", {
        id: id,
        title: diaryTitle,
        question: diaryQuestion,
        content: diaryContent,
        weather: diaryWeather,
        mood: diaryMood,
        time: diaryTime,
        date: date,
      })
      .then((res) => {
        alert(res.data.msg); //서버에서 받아온 메세지
        history.goBack(); //뒤로가기
        // history.push("/main"); //메인으로 이동
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="writePage">
        {/* 시계 */}
        <header>
          <Clock />
        </header>
        {/* 다이어리 테두리 */}
        <div className="body">
          <div className="backGround">
            {/* 글쓰기 공간 */}
            <div className="writeSpace">
              {/* 제목 */}
              <input className="titleField" type="text" placeholder="Title" onChange={onChangeTitle} />
              {/* 질문 */}
              <div className="question">
                <RandomQuestion />
              </div>
              {/* 글내용 */}
              <textarea className="contentField" placeholder="Content" onChange={onChangeContent} maxLength={250} />
            </div>
            {/* 기능 공간 */}
            <div className="funcSpace">
              {/* 첫 번째 스티커(날씨) */}
              <div className="note sticky1">
                <div className="stiker1" />
                <div className="text">Weather</div>
                <div className="container">
                  <ul className="weatherList" onChange={onChangeDiaryWeather}>
                    <li className="weather__list__item">
                      <input type="radio" className="weather-radio-btn" name="weatherChoice" id="w-a-opt" value="Sun" />
                      <label htmlFor="w-a-opt" className="weatherlabel">
                        Sun
                      </label>
                    </li>

                    <li className="weather__list__item">
                      <input type="radio" className="weather-radio-btn" name="weatherChoice" id="w-b-opt" value="Cloudy" />
                      <label htmlFor="w-b-opt" className="weatherlabel">
                        Cloudy
                      </label>
                    </li>

                    <li className="weather__list__item">
                      <input type="radio" className="weather-radio-btn" name="weatherChoice" id="w-c-opt" value="Rain" />
                      <label htmlFor="w-c-opt" className="weatherlabel">
                        Rain
                      </label>
                    </li>

                    <li className="weather__list__item">
                      <input type="radio" className="weather-radio-btn" name="weatherChoice" id="w-d-opt" value="Snow" />
                      <label htmlFor="w-d-opt" className="weatherlabel">
                        Snow
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              {/* 두 번째 스티커(시간) */}
              <div className="note sticky2">
                <div className="stiker2" />
                <div className="text">Time</div>
                <div className="container">
                  <ul className="timeList" onChange={onChangeDiaryTime}>
                    <li className="time__list__item">
                      <input type="radio" className="time-radio-btn" name="timeChoice" id="t-a-opt" value="Morning" />
                      <label htmlFor="t-a-opt" className="timelabel">
                        Morning
                      </label>
                    </li>

                    <li className="time__list__item">
                      <input type="radio" className="time-radio-btn" name="timeChoice" id="t-b-opt" value="Noon" />
                      <label htmlFor="t-b-opt" className="timelabel">
                        Noon
                      </label>
                    </li>

                    <li className="time__list__item">
                      <input type="radio" className="time-radio-btn" name="timeChoice" id="t-c-opt" value="Evening" />
                      <label htmlFor="t-c-opt" className="timelabel">
                        Evening
                      </label>
                    </li>

                    <li className="time__list__item">
                      <input type="radio" className="time-radio-btn" name="timeChoice" id="t-d-opt" value="Night" />
                      <label htmlFor="t-d-opt" className="timelabel">
                        Night
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              {/* 세 번째 스티커(기분) */}
              <div className="note sticky3">
                <div className="stiker3" />
                <div className="text">Mood</div>
                <div className="mood" id="mood">
                  😐
                </div>
                <Slider
                  className="moodSlider"
                  size="small"
                  defaultValue={50}
                  onChange={onChangeDiaryMood}
                  sx={{
                    color: "#cc8787",
                  }}
                />
              </div>
              {/* submit, cancle 구역 */}
              <div className="pinkDiv">
                <div className="paper pink" onClick={onClickSubmit}>
                  <div className="tape-section" />
                  <p>submit</p>
                  <div className="tape-section" />
                </div>
              </div>
              <div className="blueDiv">
                <div
                  className="paper blue"
                  onClick={() => {
                    history.goBack(); //뒤로가기
                  }}
                >
                  <div className="top-tape" />
                  <p>cancle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WritePage;
