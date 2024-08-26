import instance from "./axios.config";

const LessonService = {
  getAllLessonsByCourseID: async (courseID) => {
    try {
      const response = await instance.post(
        `/instructor/get_all_lessons_by_courseID`,
        {
          courseID,
        }
      );
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  getLessonDetail: async (lessonID) => {
    try {
      const response = await instance.post(`/instructor/get_lesson_detail`, {
        lessonID,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  deleteLesson: async (lessonID) => {
    try {
      const response = await instance.post(`/instructor/delete_lesson`, {
        lessonID,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  updateLesson: async (lessonID, title, duration, complexityLevel) => {
    try {
      const response = await instance.post(`/instructor/update_lesson`, {
        lessonID,
        title,
        duration,
        complexityLevel,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  sortLesson: async (lessonID, orderLesson) => {
    try {
      const response = await instance.post(`/instructor/sort_lesson`, {
        lessonID,
        orderLesson,
      });
      return response;
    } catch (error) {
      console.error("Error fetching data: ", error);
      return { data: null, error: error.message || "An error occurred" };
    }
  },
  LessonDocument: {
    async createLessonDocument(
      courseID,
      title,
      duration,
      complexityLevel,
      topic,
      orderLesson
    ) {
      try {
        const response = await instance.post(
          `/instructor/create_lesson_document`,
          {
            courseID,
            title,
            duration,
            complexityLevel,
            topic,
            orderLesson,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    addPageToDocument: async (lessonDocumentID, content, page) => {
      try {
        const response = await instance.post(
          `/instructor/add_page_to_lesson_document`,
          {
            lessonDocumentID,
            content,
            page,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    updatePageDocument: async (pageDocumentID, content, page) => {
      try {
        const response = await instance.post(
          `/instructor/update_page_to_lesson_document`,
          {
            pageDocumentID,
            content,
            page,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getAllPageDocument: async (lessonDocumentID) => {
      try {
        const response = await instance.post(
          `/instructor/get_all_page_document_by_id`,
          {
            lessonDocumentID,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    deletePageDocument: async (pageDocumentID) => {
      try {
        const response = await instance.post(
          `/instructor/delete_page_to_lesson_document`,
          {
            pageDocumentID,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },

  LessonVideo: {
    CreateLessonVideo: async (
      courseID,
      title,
      duration,
      complexityLevel,
      topic,
      orderLesson,
      url
    ) => {
      try {
        const response = await instance.post(
          `/instructor/create_lesson_video`,
          {
            courseID,
            title,
            duration,
            complexityLevel,
            topic,
            orderLesson,
            url,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    upDateLessonVideo: async (lessonVideoID, url) => {
      try {
        const response = await instance.post(
          `/instructor/update_lesson_video`,
          {
            lessonVideoID,
            url,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
  },
  LessonTest: {
    createLessonTest: async (
      courseID,
      title,
      duration,
      topic,
      complexityLevel,
      orderLesson
    ) => {
   
      try {
        const response = await instance.post(`/instructor/create_lesson_test`, {
          courseID,
          title,
          duration,
          complexityLevel,
          topic,
          orderLesson,
        });
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },

    addQuestionToTest: async (
      lessonTestID,
      title,
      question,
      option1,
      option2,
      option3,
      answer
    ) => {
      try {
        const response = await instance.post(
          `/instructor/add_question_to_lesson_test`,
          {
            lessonTestID,
            title,
            question,
            option1,
            option2,
            option3,
            answer,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    updateQuestionToTest: async (
      questionID,
      lessonTestID,
      title,
      question,
      option1,
      option2,
      option3,
      answer
    ) => {
      try {
        const response = await instance.post(
          `/instructor/update_question_to_lesson_test`,
          {
            questionID,
            lessonTestID,
            title,
            questionContent: question,
            option1,
            option2,
            option3,
            answer,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getAllLessonTest: async (lessonTestID) => {
      try {
        const response = await instance.post(
          `/instructor/get_lesson_test_by_id`,
          {
            lessonTestID,
          }
        );
        return response;
      } catch (error) {
        console.error("Error fetching data: ", error);
        return { data: null, error: error.message || "An error occurred" };
      }
    },
    getAllQuestionTest: async (lessonTestID) => {
      try {
        const response = await instance.post(
          `/instructor/get_all_question_test_by_id`,
          {
            lessonTestID,
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

export default LessonService;
