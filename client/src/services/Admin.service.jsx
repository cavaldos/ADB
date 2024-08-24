import instance from "./axios.config";

const AdminService = {
  async getAllInstructor() {
    try {
      const response = await instance.post(`/admin/get_all_instructor`);
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  async upDateInstructor(instructorID, level, status) {
    try {
      const response = await instance.post(`/admin/update_instructor`, {
        instructorID,
        level,
        status,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
};

export default AdminService;
