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
  //
};

export default ChatRepo;
