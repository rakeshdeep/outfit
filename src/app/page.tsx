import { Bot, CircleUserRound, ShoppingBag, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-10"> 
      {/* Hero section */}
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row items-center justify-evenly">
          {/* Left content */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-5xl font-bold mb-4">Find Your Perfect Style</h1>
            <p className="text-gray-600 text-lg mb-6">
              Experience personalized fashion recommendations tailored to your unique body shape, color preferences, and style with our AI-powered styling assistant.
            </p>
            <div className="flex space-x-4 mb-6">
              <div className="flex items-center space-x-2">
              <CircleUserRound className="text-blue-700 text-2xl" />
              <div>
                <h5 className="text-xl font-bold">Personal Style</h5>
                <p className="text-sm text-gray-500">Customized for you</p>
              </div>
              </div>
              <div className="flex items-center space-x-2">
              <Sparkles className="text-blue-700 text-2xl" />
              <div>
                <h5 className="text-xl font-bold">Smart Match</h5>
                <p className="text-sm text-gray-500">AI-powered suggestions</p>
              </div>
              </div>
              <div className="flex items-center space-x-2">
              <ShoppingBag className="text-blue-700 text-2xl" />
              <div>
                <h5 className="text-xl font-bold">Easy Shopping</h5>
                <p className="text-sm text-gray-500">Direct purchases</p>
              </div>
              </div>
            </div>
            <button className="bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors">
              Chat Now
            </button>
          </div>
          
          {/* Right content - Image */}
          <div className="">
            <img 
              src="./images/hero-section.png" 
              alt="Fashion Model"
              className=""
            />
          </div>
        </div>
      </div>
      {/* Banner section */}
      <div className="h-[400px] w-full my-5 mx-10 rounded-xl bg-[url(/images/banner.png)] bg-cover bg-center bg-no-repeat">
      </div>

      {/* Features Card */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full my-5 mx-auto py-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <Bot className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">AI Style Analysis</h3>
            <p className="text-gray-600 mb-4">Get personalized fashion recommendations based on your body type and preferences</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Learn More →</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <Sparkles className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Trend Predictions</h3>
            <p className="text-gray-600 mb-4">Stay ahead with AI-powered fashion trend forecasting and style insights</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Learn More →</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <ShoppingBag className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Smart Wardrobe</h3>
            <p className="text-gray-600 mb-4">Organize and optimize your wardrobe with intelligent outfit combinations</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Learn More →</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow">
            <Bot className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">AI Style Analysis</h3>
            <p className="text-gray-600 mb-4">Get personalized fashion recommendations based on your body type and preferences</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium">Learn More →</button>
          </div>
        </div>
      </div>
    </div>
  );
}