import DataConnect from "../utils/DataConnect";

const ForumRepo = {
  // 1. create DiscussionForum
  async createDiscussionForum(courseID: number) {
    try {
      const proc = "create_discussion_forum";
      const params = {
        CourseID: courseID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 2. create DiscussionForum message
  async createDiscussionForumMessage(
    discussionForumID: number,
    messageContent: string,
    userID: number
  ) {
    try {
      const proc = "create_message_forum";
      const params = {
        DiscussionForumID: discussionForumID,
        MessageContent: messageContent,
        UserID: userID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  // 3. delete DiscussionForum
  async deleteDiscussionForum(
    DiscussionForumID: number,
    forumMessageID: number,
    userID: number
  ) {
    try {
      const proc = "delete_message_forum";
      const params = {
        ForumMessageID: DiscussionForumID,
        DiscussionForumID: forumMessageID,
        UserID: userID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
  getAllMessageForum(courseID: number) {
    try {
      const query = `select fr.*,[u].FullName as SenderName from [ForumMessage] fr 
                    join [DiscussionForum] df on fr.DiscussionForumID = df.ForumID
                    join [User] u on fr.SenderID = u.UserID
                    where df.CourseID = @courseID`;
      return DataConnect.executeWithParams(query, { courseID });
    } catch (error: any) {
      throw new Error(`Error starting learn process: ${error.message}`);
    }
  },
};
export default ForumRepo;
