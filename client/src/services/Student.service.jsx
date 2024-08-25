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

    applyDiscountCode: async (discountCode, invoiceDetailID) => {
      try {
        const response = await instance.post(`/student/apply_discount_code`, {
          discountCode: discountCode,
          invoiceDetailID: invoiceDetailID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    deleteInvoiceDetail: async (invoiceDetailID) => {
      try {
        const response = await instance.post(`/student/delete_invoice_detail`, {
          invoiceDetailID: invoiceDetailID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getInvoiceDetails: async (invoiceID) => {
      try {
        const response = await instance.post(`/student/get_invoice_details`, {
          invoiceID: invoiceID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getAllInvoiceByStudentID: async (studentID) => {
      try {
        const response = await instance.post(
          `/student/get_all_invoice_by_studentid`,
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
    paymentInvoice: async (invoiceID) => {
      try {
        const response = await instance.post(`/student/payment_invoice`, {
          invoiceID: invoiceID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    }
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
