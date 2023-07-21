const useLogout = (setUserInfo) => {
    const handleLogout = () => {
        setUserInfo({
            id: "",
            name: "",
            email: "",
            profileImage: "",
            isLogin: false,
        });
    };
    return handleLogout;
};

export default useLogout;
