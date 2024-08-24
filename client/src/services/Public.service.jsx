import Upload from "antd/es/upload/Upload";
import instance from "./axios.config";

const PublicService = {
  searchCourse: async (searchString, pageSize, page) => {
    try {
      const response = await instance.post(`/public/search_course`, {
        searchString,
        pageSize,
        page,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  autoComplete: async (searchString) => {
    const pageSize = 10;
    const page = 1;
    try {
      const response = await instance.post(`/public/search_course`, {
        searchString,
        pageSize,
        page,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  getAllCourse: async (pageSize, page) => {
    try {
      const response = await instance.post(`/public/get_all_course`, {
        pageSize,
        page,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },

  Chat: {
    createChat: async (chatContent, sendChatID, receiveChatID) => {
      try {
        const response = await instance.post(`/public/create_chat`, {
          chatContent,
          sendChatID,
          receiveChatID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getAllChat: async (sendChatID, receiveChatID) => {
      try {
        const response = await instance.post(`/public/get_all_chat`, {
          sendChatID,
          receiveChatID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getAllUserChat: async (userID) => {
      try {
        const response = await instance.post(`/public/get_all_user_chat`, {
          userID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    deleteChat: async (chatID) => {
      try {
        const response = await instance.post(`/public/delete_chat`, {
          chatID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
  Banking: {
    createBanking: async (
      userID,
      accountNumber,
      accountHolderName,
      accountBalance,
      bankName
    ) => {
      try {
        const response = await instance.post(`/public/create_bank_account`, {
          userID,
          accountNumber,
          accountHolderName,
          accountBalance,
          bankName,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getBankAccount: async (userID) => {
      try {
        const response = await instance.post(`/public/get_bank_account`, {
          userID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },

    updateBankAccount: async (
      bankAccountID,
      userID,
      accountNumber,
      accountHolderName,
      accountBalance,
      bankName
    ) => {
      try {
        const response = await instance.post(`/public/update_bank_account`, {
          bankAccountID,
          userID,
          accountNumber,
          accountHolderName,
          accountBalance,
          bankName,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    transferMoney: async (bankAccountID, amount, type) => {
      try {
        const response = await instance.post(`/public/transfer_money`, {
          bankAccountID,
          amount,
          type: type,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getHistoryBanking: async (bankAccountID) => {
      try {
        const response = await instance.post(`/public/get_history_banking`, {
          bankAccountID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
  Forum: {
    createDisForum: async (courseID) => {
      try {
        const response = await instance.post(`/public/create_forum`, {
          courseID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    sendForumMessage: async (discussionForumID, messageContent, userID) => {
      try {
        const response = await instance.post(`/public/create_message_forum`, {
          discussionForumID,
          messageContent,
          userID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getAllMesForum: async (courseID) => {
      try {
        const response = await instance.post(`/public/get_all_mess_forum`, {
          courseID,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
};

export default PublicService;
