import React, { useState } from "react";
import { Tag, Input, Button, message } from "antd";
import { ConvertTime } from "../../../hooks/Time.utils";
import LessonService from "../../../services/Lesson.Service";
import { useDispatch } from "react-redux";
import { resetState } from "../../../redux/features/resetStateSlice";
function EditLessonVideo(props) {
  const {
    LessonsID,
    Title,
    Duration,
    ComplexityLevel,
    CreatedTime,
    UpdatedTime,
    LessonType,
    Topic,
    OrderLessons,
    CourseID,
    LessonVideoID,
    URL,
  } = props;

  const [videoLink, setVideoLink] = useState(URL); // Initialize with current URL
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleUpdateVideoLink = async () => {
    setLoading(true);
    try {
      const response = await LessonService.LessonVideo.upDateLessonVideo(
        LessonVideoID,
        videoLink
      );
      if (response.status === 200) {
        message.success("Video link updated successfully.");
        dispatch(resetState());
      } else {
        message.error("An error occurred while updating the video link.");
      }
    } catch (error) {
      message.error("An error occurred while updating the video link.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col gap-3">
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="mb-4">
          <div className="flex gap-2 items-center">
            <h3 className="text-lg text-gray-900 font-medium">Lesson Title:</h3>
            <span className="text-lg font-semibold text-gray-700 italic">
              {Title}
            </span>
          </div>
          <div className="flex gap-2 items-center mt-2">
            <h3 className="text-lg text-gray-900 font-medium">Topic:</h3>
            <span className="text-lg font-semibold text-gray-700 italic">
              {Topic}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <Tag className="w-auto inline-block max-w-max" color="blue">
            {`Duration: ${Duration}`}
          </Tag>
          <Tag className="w-auto inline-block max-w-max" color="green">
            {`Complexity: ${ComplexityLevel}`}
          </Tag>
          <Tag className="w-auto inline-block max-w-max" color="purple">
            {`Type: ${LessonType}`}
          </Tag>
          <Tag className="w-auto inline-block max-w-max" color="purple">
            {`Created Time: ${ConvertTime.convertTimeToDDMM(CreatedTime)}`}
          </Tag>
          <Tag className="w-auto inline-block max-w-max" color="purple">
            {`Updated Time: ${ConvertTime.convertTimeToDDMM(UpdatedTime)}`}
          </Tag>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <h3 className="text-lg text-gray-900 font-medium">
            Update Video Link:
          </h3>
          <Input
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Enter new video link"
          />
          <Button
            type="primary"
            onClick={handleUpdateVideoLink}
            loading={loading}
            className="mt-2"
          >
            Update Video Link
          </Button>
        </div>
        <iframe
          src={
            videoLink ||
            URL ||
            "https://www.youtube.com/watch?v=Ty1GY96FvEQ&list=RDjq9WfHjIzGA&index=3"
          }
          title="YouTube video player"
          // className=" w-auto h-[500px] rounded-lg shadow-lg mx-4"
          related="0"
          rel="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "
          showinfo="0"
        ></iframe>
      </div>
    </div>
  );
}

export default EditLessonVideo;
