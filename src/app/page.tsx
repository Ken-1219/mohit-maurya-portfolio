import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WorkIndex from "@/components/WorkIndex";
import JobSection from "@/components/JobSection";
import YirifiSection from "@/components/YirifiSection";
import SideProjects from "@/components/SideProjects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { jobs } from "@/data/employers";

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="band" style={{ paddingTop: "var(--spacing-md)" }}>
        <Nav />
      </header>
      <main id="main">
        <Hero />
        <WorkIndex />
        {jobs.map((job) => (
          <JobSection key={job.id} job={job} />
        ))}
        <YirifiSection />
        <SideProjects />
        <Skills />
        <About />
        <Contact />
      </main>
    </>
  );
}
