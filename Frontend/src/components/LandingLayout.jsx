import {} from "@clerk/clerk-react" 
import Landing from "./LandingPage.jsx";
import Feature from "./FeatureSection.jsx";
import AnalyticSection from "./AnalyticSection.jsx";
import BeforeAfterSection from "./BeforeAfterSection.jsx";
import Testimonal from "./Testimonal.jsx";
import Footer from "./Footer.jsx";
import PricingSection from "./PricingSection.jsx";

const LandingLayout = () => {
  return (
    <div>
      <Landing></Landing>
      <Feature></Feature>
      <AnalyticSection></AnalyticSection>
      <BeforeAfterSection></BeforeAfterSection>
      <Testimonal></Testimonal>
      <Footer></Footer>
      <PricingSection></PricingSection>
    </div>
  )
}

export default LandingLayout
