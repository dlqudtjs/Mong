import axios from "axios";
import React, { useState } from "react";
import "../css/RegisterPage.scoped.sass";

function RegisterPage() {
  const [id, setId] = useState("");
  const [psword, setPsword] = useState("");
  const [checkPswrod, setCheckPswrod] = useState("");
  const [username, setUserName] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPsword(e.target.value);
  };
  const onChangeCheckPassword = (e) => {
    setCheckPswrod(e.target.value);
  };
  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const registerCheck = () => {
    if (id === "") {
      alert("아이디를 입력해주세요.");
      return false;
    }
    if (psword === "" || checkPswrod === "") {
      alert("비밀번호를 입력해주세요.");
      return false;
    }
    if (psword !== checkPswrod) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (username === "") {
      alert("이름을 입력해주세요.");
      return false;
    }

    return true;
  };

  const onClickRegister = () => {
    if (!registerCheck()) {
      return;
    }

    axios
      .post("http://localhost:5000/register", {
        id: id,
        psword: psword,
        username: username,
      })
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="registerbody">
      <div className="App">
        <div className="inputcontainer">
          <input type="text" placeholder="Id" value={id} onChange={onChangeId} />
        </div>
        <div className="inputcontainer">
          <input type="text" placeholder="username" value={username} onChange={onChangeUserName} />
        </div>
        <div className="inputcontainer">
          <input type="password" placeholder="Password" value={psword} onChange={onChangePassword} />
        </div>
        <div className="inputcontainer">
          <input type="password" placeholder="PasswordCheck" value={checkPswrod} onChange={onChangeCheckPassword} />
        </div>
        <button type="button" onClick={onClickRegister}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
