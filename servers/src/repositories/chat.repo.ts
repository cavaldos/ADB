import DataConnect from "../utils/DataConnect";

const ChatRepo = {
  // 1. create chat
  async createChat(
    chatContent: string,
    sendChatID: number,
    receiveChatID: number
  ) {
    try {
      const proc = "create_chat";
      const params = {
        ChatContent: chatContent,
        SendChatID: sendChatID,
        ReceiveChatID: receiveChatID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  //
  // 2. get all chat
  async getAllChat(sendChatID: number, receiveChatID: number) {
    try {
      const proc = "get_all_chat";
      const params = {
        SendChatID: sendChatID,
        ReceiveChatID: receiveChatID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 3. get all user chat
  async getAllUserChat(userID: number) {
    try {
      const query = `
          DECLARE @CurrentUserID int = @UserID;
          SELECT DISTINCT 
              u.UserID, 
              u.UserName, 
              u.FullName, 
              u.Role,
              u.Email, 
              u.Phone
          FROM 
              [User] u
          JOIN 
              Chat c 
              ON (u.UserID = c.SendChatID AND c.ReceiveChatID = @CurrentUserID)
              OR (u.UserID = c.ReceiveChatID AND c.SendChatID = @CurrentUserID)
          WHERE 
              u.UserID <> @CurrentUserID;`;
      const params = {
        UserID: userID,
      };
      return await DataConnect.executeWithParams(query, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  async deleteChat(chatID: number) {
   try {
    const query = `DELETE FROM [Chat] WHERE ChatID = @ChatID;`;
    const params = {
      ChatID: chatID,
    };
    return await DataConnect.executeWithParams(query, params);

   } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  }
};
export default ChatRepo;
