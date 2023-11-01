const UseKakaoLogin = () => {
    // const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const Rest_api_key = "efd9cfb14e761f93429607b7f73e2377";
    // const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const redirect_uri = "http://15.164.232.95:9000/kakao/callback";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
        // const code = new URL(window.location.href).searchParams.get("code");
        // console.log("code:", code);
    };

    return handleLogin;
};

export default UseKakaoLogin;
