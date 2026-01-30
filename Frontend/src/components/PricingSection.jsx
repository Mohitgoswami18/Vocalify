import React from 'react'

const PricingSection = () => {
  return (
    <div>
      {/* Pricing – Early Access */}
      <section className="py-20 px-6 bg-white font-[Inter]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Flexible Plans to Match Your Goals
          </h2>

          <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto">
            We’re currently in early access. Pricing will be finalized soon —
            join early to get notified and secure exclusive benefits.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter */}
            <div className="border rounded-2xl p-8 text-left">
              <div>
                <h3 className="font-extrabold text-5xl text-center">Starter</h3>

                <p className="mt-2 text-sm text-center  mb-8 text-gray-500">
                  Ideal for individuals getting started
                </p>

                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  <li>✔ Basic voice analysis</li>
                  <li>✔ Confidence & clarity metrics</li>
                  <li>✔ Progress tracking</li>
                  <li>✔ Standard insights</li>
                </ul>
              </div>

              <button className="mt-4 w-full border font-bold py-3 rounded-lg text-sm bg-gray-100 hover:bg-gray-200">
                Join Early Access
              </button>
            </div>

            {/* Pro */}
            <div className="border-2 border-blue-500 rounded-2xl p-8 text-left bg-blue-50">
              <h3 className="font-extrabold text-5xl text-center">Pro</h3>

              <p className="mt-2 text-sm text-center  mb-8 text-gray-500">
                For professionals serious about improvement
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>✔ Advanced AI analysis</li>
                <li>✔ Detailed metric breakdowns</li>
                <li>✔ Personalized insights</li>
                <li>✔ Full history access</li>
                <li>✔ Priority features</li>
              </ul>

              <button className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 font-semibold rounded-lg text-sm">
                Join Early Access
              </button>
            </div>
          </div>

          <p className="mt-8 text-xs text-gray-400">
            Pricing and features may evolve during early access.
          </p>
        </div>
      </section>
    </div>
  );
}

export default PricingSection
