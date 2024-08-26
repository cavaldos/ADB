import instance from "./axios.config";

const GuestService = {
  login: async (userName, password) => {
    try {
      const response = await instance.post(`/guest/login`, {
        userName: userName,
        password: password,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  register: async (
    userName,
    password,
    email,
    fullName,
    phone,
    address,
    role
  ) => {
    try {
      const response = await instance.post(`/guest/register`, {
        userName: userName,
        password: password,
        email: email,
        fullName: fullName,
        phone: phone,
        address: address,
        role: role,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
};

export default GuestService;
