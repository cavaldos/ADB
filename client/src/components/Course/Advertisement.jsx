import React, { useRef, useState, useEffect } from "react";
import { Carousel, Card, Typography } from "antd";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import checkImageUrl from "../../hooks/GetURLImage";
const { Meta } = Card;

const CourseCarousel = ({ IsButton, time, titleCarousel }) => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Key Technologies for Business",
      provider: "IBM",
      image:
        "https://images.unsplash.com/photo-1719216324463-92a973ebf910?q=80&w=2828&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      type: "Specialization",
    },
    {
      id: 2,
      title: "Google Data Analytics",
      provider: "Google",
      image: "https://viasdfaseholder.cdom/300x200",
      type: "Professional Certificate",
    },
    {
      id: 3,
      title: "IELTS Writing Section Skills Mastery",
      provider: "University of California, Irvine",
      image: "https://viafasdeholdder.com/300x200",
      type: "Course",
    },
    {
      id: 4,
      title: "IELTS Listening and Speaking Sections Skills Mastery",
      provider: "University of California, Irvine",
      image: "https://viasdfaceholdder.com/300x200",
      type: "Course",
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      const updatedCourses = await Promise.all(
        courses.map(async (course) => {
          const checkedImage = await checkImageUrl(course.image);
          return { ...course, image: checkedImage };
        })
      );
      setCourses(updatedCourses);
      setLoading(false); // Hình ảnh đã được tải, đặt trạng thái loading thành false
    };

    preloadImages();
  }, []);

  const carouselRef = useRef(null);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="w-full py-10 px-5 bg-white relative">
      <Typography.Title level={2} className="mb-5">
        {titleCarousel ? titleCarousel : "Advertisement"}
      </Typography.Title>
      {loading ? (
        <div>Loading...</div> // Hoặc một placeholder khác
      ) : (
        <Carousel
          ref={carouselRef}
          autoplay={!!time}
          autoplaySpeed={time || 1000}
          dots={false}
          infinite
          slidesToShow={3}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {courses.map((course) => (
            <div key={course.id} className="px-2">
              <Card
                hoverable
                cover={
                  <img
                    src={course.image}
                    alt={course.title}
                    style={{ height: "200px", objectFit: "cover" }}
                    loading="lazy" // Sử dụng lazy loading để tối ưu hóa
                  />
                }
              >
                <Meta title={course.title} description={course.provider} />
                <p className="text-gray-500 mt-2">{course.type}</p>
              </Card>
            </div>
          ))}
        </Carousel>
      )}
      {IsButton && (
        <>
          <IoIosArrowBack
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 left-0 z-10 text-4xl"
          />
          <IoIosArrowForward
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 right-0 z-10 text-4xl"
          />
        </>
      )}
    </div>
  );
};

const Advertisement = () => {
  return (
    <div className="w-full h-full p-6 flex flex-col gap-2">
      <CourseCarousel time={2000} />
      {/* <CourseCarousel time={3000} IsButton={true} /> */}
    </div>
  );
};

export default Advertisement;
