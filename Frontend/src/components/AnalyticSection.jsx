import React from 'react'
import dashboard from "../assets/dashboard.png";

const AnalyticSection = () => {
  return (
    <div>
      {/* Analytics Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center">
          Intuitive Dashboard & Comprehensive Analytics
        </h2>

        <div className="mt-10 bg-gray-100 rounded-xl p-10 flex items-center justify-center">
          <img src={dashboard} alt="" className='rounded-md'/>
        </div>
      </section>
    </div>
  );
}

export default AnalyticSection
