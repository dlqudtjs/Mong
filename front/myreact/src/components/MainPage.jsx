import { useLocation, useHistory } from "react-router-dom";
import "../css/MainPage.scoped.css";

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

  const onclickLogout = () => {
    history.push({
      pathname: "/login",
    });
  };

  return (
    <div className="root">
      <div className="main">
        <main className="page-content">
          <div className="card">
            <div className="content">
              <h2 className="title">Write</h2>
              <p className="copy">자신의 일기를 작성해보세요!</p>
              <button className="btn" onClick={onclickWrite}>
                Write
              </button>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <h2 className="title">Read</h2>
              <p className="copy">작성한 일기를 읽어보세요!</p>
              <button className="btn" onClick={onclickListView}>
                Read
              </button>
            </div>
          </div>
          <div className="card">
            <div className="content">
              <h2 className="title">Logout</h2>
              <p className="copy">다음에 또 오세요!</p>
              <button className="btn" onClick={onclickLogout}>
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainPage;
