const authHeader = () => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.token) {
        return { Authorization: "Bearer " + user.token };
      }
    }
  }
  return {};
};

export default authHeader;
