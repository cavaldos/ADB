

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">coursera</div>
        <div>
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="border rounded-full px-4 py-2 w-80"
          />
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-600">
            English
          </a>
          <a href="#" className="text-gray-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405M19 9l-7 7-3-3m-5 4h.01M4 5h16M4 9h16m-2 5H6"
              />
            </svg>
          </a>
          <div className="text-gray-600 rounded-full bg-blue-600 w-8 h-8 flex items-center justify-center text-white">
            N
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md border-t mt-12">
        <div className="container mx-auto px-6 py-3 flex space-x-6">
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 py-2">
            Home
          </a>
          <a href="#" className="text-gray-600 py-2">
            My Learning
          </a>
          <a href="#" className="text-gray-600 py-2">
            Online Degrees
          </a>
          <a href="#" className="text-gray-600 py-2">
            Find your New Career
          </a>
        </div>
      </div>
    </nav>
  );
};

const ProductCard = ({ image, title, provider }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="text-sm text-gray-600">{provider}</div>
        <div className="font-bold text-xl">{title}</div>
      </div>
    </div>
  );
}



const GuestPage = () => {
  const recentlyViewed = [
    {
      image: "https://via.placeholder.com/300x200",
      title: "Introduction to Data Analytics",
      provider: "IBM",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "IBM Data Analyst",
      provider: "IBM",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Smart Contracts",
      provider: "University at Buffalo",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Introduction to Ethereum Blockchain",
      provider: "EDUCBA",
    },
  ];

  const popularCertificates = [
    {
      image: "https://via.placeholder.com/300x200",
      title: "Machine Learning Specialization",
      provider: "DeepLearning.AI",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "IBM Data Analyst",
      provider: "IBM",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Google Cloud",
      provider: "Google",
    },
    {
      image: "https://via.placeholder.com/300x200",
      title: "Introduction to Programming",
      provider: "University of Michigan",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">Recently Viewed Products</h2>
        <div className="grid grid-cols-4 gap-6">
          {recentlyViewed.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
              provider={product.provider}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mt-10 mb-6">
          Most Popular Certificates
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {popularCertificates.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              title={product.title}
              provider={product.provider}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestPage;
