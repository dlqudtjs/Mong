import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
//id, title, content, date, weather, mood

function WritePage() {
  const location = useLocation(); //location 객체는 현재 페이지의 주소 정보를 가지고 있다.
  const history = useHistory(); //history는 뒤로가기, 앞으로가기, 새로고침, 이동 등을 할 수 있게 해준다.
  const id = location.state.id; //id 받아오기
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [diaryWeather, setDiaryWeather] = useState("");
  const [diaryMood, setDiaryMood] = useState("");

  const onChangeTitle = (e) => {
    setDiaryTitle(e.target.value);
  };

  const onChangeContent = (e) => {
    checkContentLength(e);
    setDiaryContent(e.target.value);
  };

  const onChangeDiaryWeather = (e) => {
    setDiaryWeather(e.target.value);
  };

  const onChangeDiaryMood = (e) => {
    setDiaryMood(e.target.value);
  };

  const onClickSubmit = (e) => {
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

  const checkContentLength = (e) => {
    document.getElementById("textCount").innerHTML = e.target.value.length; //글자수 세기
    if (e.target.value.length > 500) {
      e.preventDefault();
      alert("글자수는 500자를 넘을 수 없습니다.");
      setDiaryContent(e.target.value.substring(0, 500));
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
      <TextField id="outlined-multiline-static" label="Title" multiline rows={1} margin="normal" onChange={onChangeTitle} />
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
