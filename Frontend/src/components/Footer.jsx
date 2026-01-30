import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 font-[Inter]">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-around">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                ◇
              </div>
              <span className="font-semibold text-gray-900">
                Vocalify
              </span>
            </div>

            <p className="text-xs text-gray-500">
              © 2026 Vocal Insights AI. <br />
              All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-sm">
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer text-xs">Home</li>
              <li className="hover:text-gray-900 cursor-pointer text-xs">Features</li>
              <li className="hover:text-gray-900 cursor-pointer text-xs">Pricing</li>
              <li className="hover:text-gray-900 cursor-pointer text-xs">
                Testimonials
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer text-xs">
                Privacy Policy
              </li>
              <li className="hover:text-gray-900 cursor-pointer text-xs">
                Terms of Service
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex items-center gap-4 text-gray-600 text-lg">
              <FaTwitter className="cursor-pointer hover:text-gray-900" />
              <FaLinkedin className="cursor-pointer hover:text-gray-900" />
              <FaGithub className="cursor-pointer hover:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
