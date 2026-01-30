import { PiQuotesDuotone } from "react-icons/pi";
import pic1 from "../assets/pic1.png"
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";

const Testimonal = () => {
  return (
    <div>
      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-6 font-[Inter] ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "Vocal Insights AI completely transformed my presentation skills. The clarity and confidence metrics were game-changers!",
                name: "Alex Morgan",
                avatar: { pic1 },
              },
              {
                text: "As a public speaker, accurate feedback is crucial. This platform delivers precise, actionable insights every time.",
                name: "Ritika Sharma",
                avatar: { pic2 },
              },
              {
                text: "I've always struggled with my speaking pace. Vocal Insights AI helped me find my optimal rhythm and communicate more effectively",
                name: "Daniel Kim",
                avatar: { pic3 },
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-xl p-6 text-left"
              >
                <div className="flex items-center text-3xl py-4">
                  <PiQuotesDuotone></PiQuotesDuotone>
                </div>
                <p className="text-sm text-black mb-8">“{item.text}”</p>

                <div>
                  <img src={item.avatar} alt="" />
                  <p className="text-sm font-semibold">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonal;
