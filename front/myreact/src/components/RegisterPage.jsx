import React, { useState } from "react";

function RegisterPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div>
        <form className="Register-form">
          <input
            type="text"
            placeholder="id"
            value={id}
            onChange={onChangeId}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
