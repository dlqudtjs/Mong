import { useLocation, useHistory } from "react-router-dom";

function MainPage() {
  const location = useLocation();
  const history = useHistory();

  const onclickWrite = () => {
    history.push({
      // push()는 history stack에 새로운 페이지를 추가한다.
      pathname: "/write", // pathname은 주소를 의미한다.
      state: {
        // state는 주소에 담을 데이터를 의미한다.
        id: location.state.id,
      },
    });
  };

  const onclickListView = () => {
    history.push({
      pathname: "/listview",
      state: {
        id: location.state.id,
      },
    });
  };

  return (
    <div>
      <input type="button" value="글쓰기" onClick={onclickWrite} />
      <input type="button" value="글목록" onClick={onclickListView} />
    </div>
  );
}

export default MainPage;
