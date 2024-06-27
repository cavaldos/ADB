import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 p-4 ">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="">
            <h3 className="font-bold text-lg mb-4 flex ">Get Started with AI</h3>
            <ul >
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  DLAI AI For Everyone Course
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  DLAI Deep Learning Specialization
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  DLAI GenAI with LLMs Course
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Google AI Essentials
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Google Cloud Introduction to Generative AI Course
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  IBM AI Product Manager Professional Certificate
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Stanford Machine Learning Specialization
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Vanderbilt Prompt Engineering for ChatGPT Course
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  All Artificial Intelligence Courses
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">
              Popular Career Certificates
            </h3>
            <ul>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Google Cybersecurity Professional Certificate
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Google Data Analytics Professional Certificate
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Google Digital Marketing Professional Certificate
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Google Project Management Professional Certificate
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Google UX Design Professional Certificate
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  IBM Data Science Professional Certificate
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Microsoft Power BI Data Analyst Professional Certificate
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  All Career Certificates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Popular Subjects</h3>
            <ul>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Generative AI
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Project Management
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Python
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  All Courses
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Popular Resources</h3>
            <ul>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  How to Become a Data Analyst
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  How to Get a PMP Certification
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Popular Cybersecurity Certifications
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Popular Data Analytics Certifications
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Popular IT Certifications
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Popular Machine Learning Certifications
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Popular SQL Certifications
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-700 hover:text-blue-600">
                  Career Insights & Advice Hub
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto text-center">
          We collaborate with{" "}
          <span className="text-blue-600 font-bold">
            325+ leading universities and companies
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;