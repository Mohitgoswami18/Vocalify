import React from 'react'

const BeforeAfterSection = () => {
  return (
    <div>
      <section className="bg-gray-50 py-16 px-18">
        <div className="max-w-5xl mx-auto text-center border rounded-2xl py-10 px-4">
          <h2 className="text-4xl font-bold mb-8">
            See Your Progress, Hear the Difference
          </h2>

          <div className=" flex flex-col py-10 md:flex-row items-center flex-nowrap gap-6">
            {/* Before */}
            <div className="border rounded-xl p-6 py-10 text-left w-[48%] bg-white">
              <h3 className="font-semibold mb-3 text-center text-lg">
                Before Vocal Insights AI
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>Unclear or inconsistent delivery</li>
                <li>Limited awareness of speaking habits</li>
                <li>Lack of actionable feedback</li>
              </ul>
            </div>

            <div className="text-2xl text-blue-500 hidden md:block">→</div>

            {/* After */}
            <div className="border rounded-xl p-6 py-10 text-left w-[48%] bg-blue-100">
              <h3 className="font-semibold mb-3 text-center">After Vocal Insights AI</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>Clear, confident communication</li>
                <li>Personalized AI-powered insights</li>
                <li>Measurable improvement over time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      ;
    </div>
  );
}

export default BeforeAfterSection
