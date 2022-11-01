import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "../css/LoginPage.module.sass";

function LoginPage() {
  const [id, setId] = useState("");
  const [psword, setPsword] = useState("");
  const history = useHistory();

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPsword(e.target.value);
  };

  const onClickLogin = () => {
    axios
      .post("http://localhost:5000/login", {
        id: id,
        psword: psword,
      })
      .then((res) => {
        alert(res.data.msg);
        if (res.data.msg === "로그인 성공") {
          history.push({
            pathname: "/main",
            state: {
              id: id,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.loginbody}>
      <div className={styles.App}>
        <div className={styles.inputcontainer}>
          <input type="text" placeholder="Id" value={id} onChange={onChangeId} />
        </div>
        <div className={styles.inputcontainer}>
          <input type="password" placeholder="Password" value={psword} onChange={onChangePassword} />
        </div>
        <button type="button" onClick={onClickLogin}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
