import { auto } from "@popperjs/core";
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
};

export default StudentService;
