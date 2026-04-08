import Navbar from "../components/Navbar";
import CoursesHero from "../components/CoursesHero";
import CoursesGrid from "../components/CoursesGrid";
import Footer from "../components/Footer";

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <main>
        <CoursesHero />
        <CoursesGrid />
      </main>
      <Footer />
    </>
  );
}
