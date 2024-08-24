import instance from "./axios.config";

const StudentService = {
  Cart: {
    addtoCart: async (studentID, courseID) => {
      try {
        const response = await instance.post(`/student/add_to_card`, {
          courseID: courseID,
          studentID: studentID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    removeFromCart: async (cartID, courseID) => {
      try {
        const response = await instance.post(`/student/remove_cart`, {
          cartID: cartID,
          courseID: courseID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    selectCart: async (studentID) => {
      try {
        const response = await instance.post(
          `/student/select_cart_by_studentid`,
          {
            studentID: studentID,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
  Invoice: {
    createInvoice: async (studentID, courseID) => {
      try {
        const response = await instance.post(`/student/create_invoice`, {
          courseID: courseID,
          studentID: studentID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },

  Learn: {
    statisticalLearnProcess: async (studentID, courseID) => {
      try {
        const response = await instance.post(
          `/student/statistical_learn_process`,
          {
            courseID: courseID,
            studentID: studentID,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },

    startLearnProcess: async (studentID, courseID) => {
      try {
        const response = await instance.post(`/student/start_learn_process`, {
          courseID: courseID,
          studentID: studentID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    updateLearnProcess: async (learnProcessID, status, studentID) => {
      try {
        const response = await instance.post(`/student/update_learn_process`, {
          learnProcessID: learnProcessID,
          status: status,
          studentID: studentID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getLearnReady: async (studentID) => {
      try {
        const response = await instance.post(
          `/student/get_my_course_to_learn`,
          {
            studentID: studentID,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
};

export default StudentService;
