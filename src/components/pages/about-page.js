import { CgShapeHexagon } from "react-icons/cg";

export default function AboutPage() {
  <svg width="10em" height="10em">
    <linearGradient
      id="header-shape-gradient"
      x1="100%"
      y1="100%"
      x2="0%"
      y2="0%"
    >
      <stop stopColor="#7a6ded" offset="0%" />
      <stop stopColor="#591885" offset="100%" />
    </linearGradient>
  </svg>;

  return (
    <div className="about-page">
      <div className="apps-intro about-intro">
        <h3>About me</h3>
        {/* <article>Here I will put a hero.</article> */}
      </div>
      <div className="about-me-container">
        <div className="about-me-hero">
          <CgShapeHexagon className="about-me-hexagon" />
          {/* <h3>About me</h3> */}
          <article>
            Here we will have a headshot, some information about me in terms of
            life, career, future plans etc.
          </article>
        </div>
      </div>
    </div>
  );
}
