const [username, setUsername] = useState("");
const [usernameError, setUsernameError] = useState("");
const onUsernameChange = (event) => {
setUsernameError("");
setUsername(event.target.value);
};
const handleSubmit = (event) => {
event.preventDefault();
if (username === "") {
setUsernameError("아이디를 입력해주세요.");
}
if (username.length < 10) {
setUsernameError("아이디가 너무 짧습니다.");
}
};
