import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
// import TextField from "@mui/material/TextField";
import "../css/WritePage.scoped.css";
//id, title, content, date, weather, mood

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
  const i = setInterval(() => {
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
  }, 1000);

  useEffect(() => {
    //컴포넌트가 파괴 될 때
    return () => clearInterval(i);
  });

  // useEffect(() => {
  //   return () => clearInterval(i);
  // }, []);

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

function WritePage() {
  const location = useLocation(); //location 객체는 현재 페이지의 주소 정보를 가지고 있다.
  const history = useHistory(); //history는 뒤로가기, 앞으로가기, 새로고침, 이동 등을 할 수 있게 해준다.
  const id = location.state.id; //id 받아오기
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [diaryWeather, setDiaryWeather] = useState("");
  const [diaryMood, setDiaryMood] = useState("");

  // const onChangeTitle = (e) => {
  //   setDiaryTitle(e.target.value);
  // };

  const onChangeContent = (e) => {
    checkContentLine(e);
    setDiaryContent(e.target.value);
  };

  // const onChangeDiaryWeather = (e) => {
  //   setDiaryWeather(e.target.value);
  // };

  // const onChangeDiaryMood = (e) => {
  //   setDiaryMood(e.target.value);
  // };

  const onClickSubmit = () => {
    if (!submitCheck()) {
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
        content: diaryContent,
        weather: diaryWeather,
        mood: diaryMood,
        date: date,
      })
      .then((res) => {
        alert(res.data.msg); //서버에서 받아온 메세지
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkContentLine = (e) => {
    let content = e.target.value;
    let contentLine = content.split("\n");
    if (contentLine.length > 10) {
      alert("10줄 이상 입력할 수 없습니다.");
      setDiaryContent(contentLine.slice(0, 10).join("\n"));
    }
  };

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
    if (diaryMood === "") {
      alert("기분을 선택해주세요.");
      return false;
    }

    return true;
  };

  return (
    <>
      <header>
        <Clock />
      </header>
      <div className="body">
        <div className="backGround">
          <div className="writeSpace">
            <input className="titleField" type="text" placeholder="Title" maxLength={15} />
            <div className="question" />
            <textarea className="contentField" placeholder="Content" onChange={onChangeContent} wrap="virtual" />
          </div>
          <div className="funcSpace" />
        </div>
      </div>
      {/* <TextField id="outlined-multiline-static" label="Title" multiline rows={1} margin="normal" onChange={onChangeTitle} />
      <br />
      <TextField id="outlined-multiline-static" label="Content" multiline rows={10} margin="normal" onChange={onChangeContent} />(<span id="textCount">0</span>/500자리)
      <br />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">weather</FormLabel>
        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
          <div onChange={onChangeDiaryWeather}>
            <FormControlLabel value="sunny" control={<Radio />} label="맑음" />
            <FormControlLabel value="cloudy" control={<Radio />} label="흐림" />
            <FormControlLabel value="rain" control={<Radio />} label="비" />
          </div>
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">mood</FormLabel>
        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
          <div onChange={onChangeDiaryMood}>
            <FormControlLabel value="good" control={<Radio />} label="good" />
            <FormControlLabel value="bad" control={<Radio />} label="bad" />
          </div>
        </RadioGroup>
      </FormControl>
      <br />
      */}
      <button type="button" onClick={onClickSubmit}>
        저장
      </button>
      <button
        type="button"
        onClick={() => {
          history.goBack(); //뒤로가기
          return false;
        }}
      >
        뒤로가기
      </button>
    </>
  );
}

export default WritePage;
