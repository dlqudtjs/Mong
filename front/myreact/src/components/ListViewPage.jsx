import axios from "axios";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

function ListViewPage() {
  const location = useLocation();
  const history = useHistory();
  const id = location.state.id;
  // const [diaryList, setDiaryList] = useState({});

  const tset = (test) => {
    var object = test;
    var keys = Object.keys(object);
    var values = Object.values(object);
    // document.getElementById("name").innerHTML = "이놈";

    for (var i = 0; i < keys.length; i++) {
      document.getElementById("name").innerHTML += "<hr />";
      document.getElementById("name").innerHTML += keys[i] + "&nbsp";
      document.getElementById("name").innerHTML += values[i].id + "&nbsp";
      document.getElementById("name").innerHTML += values[i].title + "&nbsp";
      document.getElementById("name").innerHTML += values[i].content + "&nbsp";
      document.getElementById("name").innerHTML += values[i].weather + "&nbsp";
      document.getElementById("name").innerHTML += values[i].mood + "&nbsp";
      document.getElementById("name").innerHTML += values[i].date + "&nbsp";
      console.log(keys[i], values[i]);
    }
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/listview", {
        id: id,
      })
      .then((res) => {
        tset(res.data.diaryList); //object로 받아옴
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <div id="name" />
      <button
        type="button"
        onClick={() => {
          history.goBack();
          return false;
        }}
      >
        뒤로가기
      </button>
    </div>
  );
}

export default ListViewPage;
