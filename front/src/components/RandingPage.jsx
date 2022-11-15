import "../css/RandingPage.scoped.css";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function RandingPage() {
	const [id, setId] = useState("");
	const [psword, setPsword] = useState("");
	const history = useHistory();

	const onChangeId = (e) => {
		setId(e.target.value);
	};
	const onChangePassword = (e) => {
		setPsword(e.target.value);
	};

	window.onload = function () {
		const signUpButton = document.getElementById('signUp');
		const signInButton = document.getElementById('signIn');
		const container = document.getElementById('container');

		signUpButton.addEventListener('click', () => {
			container.classList.add("right-panel-active");
		});

		signInButton.addEventListener('click', () => {
			container.classList.remove("right-panel-active");
		});
	}

	const loginCheck = () => {
		if (id === "" || psword === "") {
			alert("아이디와 비밀번호를 입력해주세요.");
			return false;
		}

		return true;
	}

	const onClickLogin = () => {
		if (!loginCheck()) {
			return;
		}

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

	const [registId, setRegistId] = useState("");
	const [registPsword, setRegistPsword] = useState("");
	const [checkPswrod, setCheckPswrod] = useState("");
	const [username, setUserName] = useState("");

	const onChangeRegistId = (e) => {
		setRegistId(e.target.value);
	};
	const onChangeRegistPassword = (e) => {
		setRegistPsword(e.target.value);
	};
	const onChangeCheckPassword = (e) => {
		setCheckPswrod(e.target.value);
	};
	const onChangeUserName = (e) => {
		setUserName(e.target.value);
	};

	const registerCheck = () => {
		if (registId === "") {
			alert("아이디를 입력해주세요.");
			return false;
		}
		if (registPsword === "" || checkPswrod === "") {
			alert("비밀번호를 입력해주세요.");
			return false;
		}
		if (registPsword !== checkPswrod) {
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
				id: registId,
				psword: registPsword,
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
		<div className="root">
			<div className="inputForm">
				<h2>하루 한 장 Diary</h2>
				<div className="container" id="container">
					<div className="form-container sign-up-container">
						<div className="form">
							<h1>Create Account</h1>
							<div className="social-container">
							</div>
							<input type="text" placeholder="아이디" onChange={onChangeRegistId} />
							<input type="text" placeholder="사용할 닉네임" onChange={onChangeUserName} />
							<input type="password" placeholder="비밀번호" onChange={onChangeRegistPassword} />
							<input type="password" placeholder="비밀번호 확인" onChange={onChangeCheckPassword} />
							<button onClick={onClickRegister}>Sign Up</button>
						</div>
					</div>
					<div className="form-container sign-in-container">
						<div className="form">
							<h1>Sign in</h1>
							<div className="social-container">
							</div>
							<input type="text" placeholder="아이디" onChange={onChangeId} />
							<input type="password" placeholder="비밀번호" onChange={onChangePassword} />
							<button onClick={onClickLogin}>Sign In</button>
						</div>
					</div>
					<div className="overlay-container">
						<div className="overlay">
							<div className="overlay-panel overlay-left">
								<h1>안녕하세요!</h1>
								<p>로그인을 통해 하루 한 장 기록해보세요!</p>
								<button className="ghost" id="signIn">Sign In</button>
							</div>
							<div className="overlay-panel overlay-right">
								<h1>안녕하세요!</h1>
								<p>회원가입을 통해 하루 한 장 기록해보세요!</p>
								<button className="ghost" id="signUp">Sign Up</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default RandingPage;