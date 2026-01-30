import tutorial from "../assets/tutorial.mp4"
import playImg from "../assets/play.png"
import main from "../assets/main.png"
import { MdOutlineExplore } from "react-icons/md";
import {useState} from "react"

const Landing = () => {

  const [play, setPlay] = useState(false)

  return (
    <div className="bg-white text-gray-900 ">
      {/* Navbar */}
      <header className="border-b font-[Inter] ">
        <div className="max-w-7xl mx-auto px-6 py-2 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
            🎤 Vocalify
          </div>

          <nav className="hidden md:flex gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="hover:text-gray-900">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-gray-900">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-gray-900">
              Contact
            </a>
          </nav>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            Sign In
          </button>
        </div>
      </header>
      {/* Hero */}
      <section className="max-w-7xl  bg-linear-to-b from-cyan-50 to-white font-[Inter] mx-auto px-18 py-32 grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tighter">
            Unlock Your Voice <br /> Potential with AI Analytics
          </h1>
          <p className="text-gray-600 mt-4 max-w-md">
            Gain instant insights into your speech patterns, improve
            communication clarity, and track your progress with our advanced
            voice analysis platform.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-blue-500 font-semibold text-sm hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              Get Started
            </button>
            <button className="border flex items-center justify-center text-xs font-bold px-6 py-3 rounded-lg"><MdOutlineExplore></MdOutlineExplore>View Demo</button>
          </div>
        </div>

        {/* Hero Visual */}
        <div  className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
          {play ? (
            <video
              src={tutorial}
              autoPlay
              controls
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div onClick={() => setPlay(true)} className="relative transition-all duration-100">
              <img src={playImg} alt="" className="absolute top-1/3 left-[45%]"/>
              <img src={main} alt="" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;
