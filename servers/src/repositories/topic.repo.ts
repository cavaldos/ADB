import DataConnect from "../utils/DataConnect";

const TopicRepo = {
  // 1. Create Topic
  async createTopic(topicName: string, courseID: number) {
    try {
      const proc = "create_topic";
      const params = {
        TopicName: topicName,
        CourseID: courseID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error creating topic: ${error.message}`);
    }
  },

  // 2. Update Topic
  async updateTopic(topicID: number, topicName: string, courseID: number) {
    try {
      const proc = "update_topic";
      const params = {
        TopicID: topicID,
        TopicName: topicName,
        CourseID: courseID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error updating topic: ${error.message}`);
    }
  },

  // 3. Delete Topic
  async deleteTopic(topicID: number) {
    try {
      const proc = "delete_topic";
      const params = {
        TopicID: topicID,
      };
      return await DataConnect.executeProcedure(proc, params);
    } catch (error: any) {
      throw new Error(`Error deleting topic: ${error.message}`);
    }
  },
  // 4. Get Topic By ID
  async getTopicById(topicID: number) {
    try {
      const query = `SELECT * FROM Topic WHERE TopicID = @topicID;`;
      return await DataConnect.executeWithParams(query, { topicID });
    } catch (error: any) {
      throw new Error(`Error fetching topic: ${error.message}`);
    }
  },
  // 5. Get All Topics
    async getAllTopics() {
        try {
        const query = `SELECT * FROM Topic;`;
        return await DataConnect.execute(query);
        } catch (error: any) {
        throw new Error(`Error fetching topics: ${error.message}`);
        }
    },
};

export default TopicRepo;
