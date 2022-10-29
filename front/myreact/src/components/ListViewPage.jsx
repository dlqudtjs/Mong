import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import "../css/ListViewPage.css";

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p>{props.weather}</p>
      <p>{props.mood}</p>
      <p>{props.date}</p>
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
    <div class="div">
      <HTMLFlipBook width={350} height={500}>
        {diaryList.map((diary) => {
          return <Page title={diary.title} content={diary.content} weather={diary.weather} mood={diary.mood} date={diary.date} />;
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
