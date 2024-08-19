import React from "react";
import { Tag } from "antd";
import { ConvertTime } from "../../../hooks/Time.utils";
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
    URL,
  } = props;
  console.log("props khanhvd", props);

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
      </div>

      <iframe
        src="https://www.youtube.com/embed/BsdSAn4NpIk"
        title="YouTube video player"
        className=" w-auto h-[500px] rounded-lg shadow-lg mx-4"
        related="0"
        rel="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture "
        showinfo="0"
      ></iframe>
    </div>
  );
}

export default EditLessonVideo;
