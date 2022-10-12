import { useLocation, useHistory } from "react-router-dom";

function MainPage() {
  const location = useLocation();
  const history = useHistory();

  const onclickWrite = () => {
    history.push({
      pathname: "/write",
      state: {
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
