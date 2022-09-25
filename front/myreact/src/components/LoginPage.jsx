import axios from "axios";
import React, { useState } from "react";
import "./LoginPage.sass";

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    axios
      .post("http://localhost:5000/login", {
        id: id,
        password: password,
      })
      .then((res) => {
        console.log(id, password);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <div className="input-container">
        <input type="text" placeholder="Id" value={id} onChange={onChangeId} />
        <i className="zmdi zmdi-account zmdi-hc-lg"></i>
      </div>
      <div className="input-container">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
        <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
      </div>
      <button type="button" onClick={onClickLogin}>
        Log In
      </button>
    </div>
  );
  // <div>
  //   <div>
  //     <input type="text" placeholder="id" value={id} onChange={onChangeId} />
  //     <input
  //       type="password"
  //       placeholder="password"
  //       value={password}
  //       onChange={onChangePassword}
  //     />
  //     <button type="button" onClick={onClickLogin}>
  //       login
  //     </button>
  //   </div>
  // </div>
  // );
}

export default LoginPage;
