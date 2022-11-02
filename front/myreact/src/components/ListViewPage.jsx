import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import "../css/ListViewPage.scoped.css";

const Page = React.forwardRef((props, ref) => {
  //forwardRef는 ref를 전달받아서 자식 컴포넌트에 전달해주는 역할을 한다.
  return (
    <div className="demoPage" ref={ref}>
      <h1>{props.diary.title}</h1>
      <p>{props.diary.content}</p>
      <p>{props.diary.weather}</p>
      <p>{props.diary.mood}</p>
      <p>{props.diary.date}</p>
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
      <HTMLFlipBook width={350} height={500}>
        {diaryList.map((diary) => {
          return <Page key={diary.date} diary={diary} />;
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
