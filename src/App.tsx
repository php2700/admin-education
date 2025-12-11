// @ts-nocheck

import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import UserTables from "./pages/Tables/userTable";
import BannerTables from "./pages/Tables/bannerTables";
import AboutTables from "./pages/Tables/about";
import BenefitTables from "./pages/Tables/benefit";
import WhyChooseTables from "./pages/Tables/whyChooseTab";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OfferTables from "./pages/Tables/offer";
import SuccessTables from "./pages/Tables/successTab";
import TrustCredTables from "./pages/Tables/trustTab";
import PlanTables from "./pages/Tables/planTab";
import FooterBannerTables from "./pages/Tables/footerBanner";
import PricingTables from "./pages/Tables/pricing";
import MathTestTables from "./pages/Tables/mathTest";
import TutoringTables from "./pages/Tables/tutoring";
import BlogTables from "./pages/Tables/blog";
import RegistrationTables from "./pages/Tables/registration";
import AboutIseeTables from "./pages/Tables/iseeTable";
import AboutElaTables from "./pages/Tables/aboutela";
import ChapterTables from "./pages/Tables/chapter";
import CompetitionTables from "./pages/Tables/competition";
import KangarooTab from "./pages/Tables/kangaroo";
import ScienceTab from "./pages/Tables/science";
import CommonCoreElaTab from "./pages/Tables/coreTab";
import LanguageTab from "./pages/Tables/languageTab";
import TestImoTables from "./pages/Tables/testImonial";
import FaqTables from "./pages/Tables/faq";
import ContactText from "./pages/Tables/contact";
import TermsTabs from "./pages/Tables/terms";
import Managements from "./pages/Tables/managmentTab";
import Testpres from "./pages/Tables/testpreTab";
import TestPrepDetails from "./pages/Tables/testdetailsTab";
import SSATtestDetails from "./pages/Tables/SSATtestTab";
import SHSATtestDetails from "./pages/Tables/SHSATtestTab";
import ISEEtestDetails from "./pages/Tables/IseeTestTab";
import ELAtestDetails from "./pages/Tables/ELAtestTab";
import ScatTestPrepAdmin from "./pages/Tables/ScatTestTab";
import AMCtestDetails from "./pages/Tables/AmcTestTab";
import KangarooDetails from "./pages/Tables/KangarooTestTab";
import ACTtestDetails from "./pages/Tables/ActTestTab";
import COGATtestDetails from "./pages/Tables/CogatTestTab";
import SBACtestDetails from "./pages/Tables/SBACTestTab";
import AccuplacerDetails from "./pages/Tables/AccuplacerTab";
import STBTtestDetails from "./pages/Tables/STBTestTab";
import PSATtestDetails from "./pages/Tables/PSATTab";
import K12Tab from "./pages/Tables/k-12";
export default function App() {
  return (
    <>
      <ToastContainer style={{ zIndex: 999999 }} />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route index path="/" element={<SignIn />} />

          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/banner" element={<BannerTables />} />

            <Route path="/why-choose-us" element={<WhyChooseTables />} />
            <Route path="/offers" element={<OfferTables />} />
            <Route path="/success-story" element={<SuccessTables />} />
            <Route path="/trust-credibility" element={<TrustCredTables />} />
            <Route path="/plan" element={<PlanTables />} />
            <Route path="/footer-banner" element={<FooterBannerTables />} />
            <Route path="/pricing" element={<PricingTables />} />
            <Route path="/math-test-prep" element={<MathTestTables />} />
            <Route path="/tutoring" element={<TutoringTables />} />
            <Route path="/blog" element={<BlogTables />} />
            <Route path="/registration" element={<RegistrationTables />} />
            <Route path="/about-isee-test" element={<AboutIseeTables />} />
            <Route path="/about-ela" element={<AboutElaTables />} />
            <Route path="/chapter" element={<ChapterTables />} />
            <Route path="/competition" element={<CompetitionTables />} />
            <Route path="/Kangaroo" element={<KangarooTab />} />
            <Route path="/science" element={<ScienceTab />} />
            <Route path="/common-core-ela" element={<CommonCoreElaTab />} />
            <Route path="/common-english-language" element={<LanguageTab />} />
            <Route path="/about" element={<AboutTables />} />
            <Route path="/testImonial" element={<TestImoTables />} />
            <Route path="/faq" element={<FaqTables />} />
            <Route path="/terms -services" element={<TermsTabs />} />
            <Route path="/Our-Managments" element={<Managements />} />
            <Route path="/Testprepration" element={<Testpres />} />
            <Route path="/contact-text" element={<ContactText />} />
            <Route path="/TestPrepDetails" element={<TestPrepDetails />} />
            <Route path="/SSATtestDetails" element={<SSATtestDetails />} />
            <Route path="/SHSATtestDetails" element={<SHSATtestDetails />} />
            <Route path="/ISEEtestDetails" element={<ISEEtestDetails />} />
            <Route path="/ELAtestDetails" element={<ELAtestDetails />} />
            <Route path="/ScatTestPrepAdmin" element={<ScatTestPrepAdmin />} />
            <Route path="/AMCtestDetails" element={<AMCtestDetails />} />
            <Route path="/KangarooDetails" element={<KangarooDetails />} />
            <Route path="/ACTtestDetails" element={<ACTtestDetails />} />
            <Route path="/COGATtestDetails" element={<COGATtestDetails />} />
            <Route path="/SBACtestDetails" element={<SBACtestDetails />} />
            <Route path="/AccuplacerDetails" element={<AccuplacerDetails />} />
            <Route path="/STBTtestDetails" element={<STBTtestDetails />} />
            <Route path="/PSATtestDetails" element={<PSATtestDetails />} />
            <Route path="/k-12" element={<K12Tab />} />

            <Route path="/users" element={<UserTables />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
