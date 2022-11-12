import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import "../css/ListViewPage.scoped.css";

const mood = new Map([["bad", "😠"], ["sad", "😢"], ["soso", "😐"], ["happy", "😏"], ["great", "😁"]]);

const Page = React.forwardRef((props, ref) => {
  //forwardRef는 ref를 전달받아서 자식 컴포넌트에 전달해주는 역할을 한다.

  return (
    <div className="contentWrapper" ref={ref}>
      <div className="contentPage">
        <h1 className="title">Title : {props.diary.title}</h1>
        <p className="weather">Weather : {props.diary.weather}</p>
        <p className="time">Time : {props.diary.writetime}</p>
        <p className="mood">Mood : {mood.get(props.diary.mood)}</p>
        <p className="question">Question : {props.diary.question}</p>
        <p className="content">{props.diary.content}</p>
        <p className="date">Date : {props.diary.date}</p>
      </div>
    </div>
  );
});

function ListViewPage() {
  const location = useLocation();
  const history = useHistory();
  const id = location.state.id;
  const [diaryList, setDiaryList] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/listview", {
        id: id,
      })
      .then((res) => {
        setDiaryList(res.data.diaryList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="diary">
      <HTMLFlipBook width={500} height={700}>
        {diaryList.map((diary, index) => {
          return <Page key={diary.date} diary={diary} index={index} />;
        })}
      </HTMLFlipBook>
      <button
        type="button"
        onClick={() => {
          history.goBack(); //뒤로가기
          return false;
        }}
      >
        뒤로가기
      </button>
    </div>
  );
}

export default ListViewPage;
