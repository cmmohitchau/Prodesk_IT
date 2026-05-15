import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-100 via-white to-green-200 overflow-hidden">
      
      
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-between min-h-screen">
        
        
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block px-4 py-2 rounded-full bg-green-200 text-green-800 font-medium text-sm shadow-md mb-6">
            ✨ Best Online Shopping Experience
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
            Discover <span className="text-green-500">Quality</span> <br />
            Products For <br />
            Everyday Life
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
            Welcome to <span className="font-semibold">Prodesk Shopping</span> —
            your one-stop destination for premium products, affordable prices,
            and a smooth shopping experience.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
            <button
              onClick={() => navigate("/shop")}
              className="px-8 py-4 rounded-2xl bg-green-500 text-white text-lg font-semibold shadow-lg hover:bg-green-600 hover:scale-105 transition duration-300 cursor-pointer"
            >
              Explore Items →
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="px-8 py-4 rounded-2xl border-2 border-green-500 text-green-600 text-lg font-semibold hover:bg-green-500 hover:text-white transition duration-300 cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          
          <div className="flex gap-8 mt-14 justify-center lg:justify-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">10K+</h2>
              <p className="text-gray-500">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">500+</h2>
              <p className="text-gray-500">Premium Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">24/7</h2>
              <p className="text-gray-500">Customer Support</p>
            </div>
          </div>
        </div>

        {/* Right Side Image/Card */}
        <div className="flex-1 mt-16 lg:mt-0 flex justify-center">
          <div className="relative">
            
            {/* Background Blur */}
            <div className="absolute inset-0 bg-green-400 blur-3xl opacity-20 rounded-full"></div>

            {/* Main Card */}
            <div className="relative bg-white/70 backdrop-blur-lg border border-white shadow-2xl rounded-3xl p-8 w-[320px] md:w-105">
              
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="shopping"
                className="rounded-2xl object-cover h-75 w-full shadow-lg"
              />

              <div className="mt-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Premium Collection
                </h2>

                <p className="text-gray-500 mt-2">
                  Shop the latest trends with unbeatable quality and style.
                </p>

                <button
                  onClick={() => navigate("/shop")}
                  className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 w-full text-center text-gray-500 text-sm md:text-base font-medium">
        Built with ❤️ by <span className="text-green-600 font-semibold">Mohit Chaudhary</span>
      </div>
    </div>
  );
};