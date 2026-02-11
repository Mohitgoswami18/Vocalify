import {} from "@clerk/clerk-react" 
import Landing from "./LandingPage.jsx";
import Feature from "./FeatureSection.jsx";
import AnalyticSection from "./AnalyticSection.jsx";
import BeforeAfterSection from "./BeforeAfterSection.jsx";
import Testimonal from "./Testimonal.jsx";
import Footer from "./Footer.jsx";
import PricingSection from "./PricingSection.jsx";
import {useRef} from "react"

const LandingLayout = () => {

  const featureRef = useRef(null)
  const pricingRef = useRef(null)
  const testimonalRef = useRef(null)
  const contactRef = useRef(null)

  return (
    <div>
      <Landing featureRef={featureRef} pricingRef={pricingRef} testimonalRef={testimonalRef} contactRef={contactRef}></Landing>
      <div id="featureRef" ref={featureRef}>
        <Feature></Feature>
      </div>
      <AnalyticSection></AnalyticSection>
      <BeforeAfterSection></BeforeAfterSection>
      <div id="pricingRef" ref={pricingRef}>
        <PricingSection></PricingSection>
      </div>
      <div ref={testimonalRef}>
        <Testimonal></Testimonal>
      </div>
      <div ref={contactRef}>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default LandingLayout
