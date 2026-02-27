import React from 'react';
import "./pages.css";
import {
  SiReact, SiJavascript, SiHtml5, SiCss3,
  SiMongodb,
  SiGit, SiDocker, SiIntellijidea, SiGooglegemini, SiVite
} from "react-icons/si";

import {
  DiPython
} from "react-icons/di";
import {
  FaJava, FaNodeJs
} from "react-icons/fa";
import {
  GrMysql
} from "react-icons/gr";
import profilePic from "../../profile_picture.jpg";
import {
  VscVscodeInsiders
} from "react-icons/vsc";
import {
  GoIssueReopened
} from "react-icons/go";

const skills = [
  { category: "Frontend", icons: [
    { name: "React", icon: <SiReact />, code: "const [user, setUser] = useState(null);\nuseEffect(() => {\n  fetchUser().then(setUser);\n}, []);" },
    { name: "JavaScript", icon: <SiJavascript />, code: "const formatData = (items) => \n  items.filter(i => i.active)\n       .map(i => ({...i, ts: Date.now()}));" },
    { name: "HTML5", icon: <SiHtml5 />, code: "<section className='grid'>\n  <article>\n    <h2>Content</h2>\n  </article>\n</section>" },
    { name: "CSS3", icon: <SiCss3 />, code: ".card {\n  display: grid;\n  place-items: center;\n  aspect-ratio: 16 / 9;\n}" }
  ]},
  { category: "Backend", icons: [
    { name: "Java", icon: <FaJava />, code: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello World\");\n  }\n}" },
    { name: "MySQL", icon: <GrMysql />, code: "SELECT u.name, p.title \nFROM users u \nJOIN posts p ON u.id = p.author_id;" },
    { name: "MongoDB", icon: <SiMongodb />, code: "db.collection.aggregate([\n  { $match: { active: true } },\n  { $group: { _id: '$cat', total: { $sum: 1 } } }\n]);" },
    { name: "Python", icon: <DiPython />, code: "def get_fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b" }
  ]},
  { category: "Tools", icons: [
    { name: "Git", icon: <SiGit />, code: "git commit -m 'feat: update';" , slogan: "Version control for the modern age."},
    { name: "Vite", icon: <SiVite />, code: "npm create vite@latest", slogan: "Next-generation frontend tooling." },
    { name: "Docker", icon: <SiDocker />, code: "docker-compose up -d" , slogan: "Package once, run anywhere."},
    { name: "IntelliJ", icon: <SiIntellijidea />, code: "Java and Kotlin IDE" , slogan: "The premier Java development environment."},
    { name: "VsCode", icon: <VscVscodeInsiders />, code: "AI-Powered code editor" , slogan: "Lean, fast, and infinitely extensible."},
    { name: "Node.js", icon: <FaNodeJs />, code: "npm run dev", slogan: "JavaScript everywhere, anytime." },
    { name: "CI/CD", icon: <GoIssueReopened />, code: "build:\n  runs-on: ubuntu-latest\n  steps:\n    - uses: actions/checkout@v5" , slogan: "Automate everything, release with confidence."},
    { name: "Google Gemini", icon: <SiGooglegemini />, code: "AI Assistant", slogan: "AI-powered coding assistance." }
  ]}
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Beyond the <span>Code</span></h1>
          <p className="lead-text">
            I'm a developer driven by the challenge of turning complex problems into 
            simple, elegant digital solutions. Based in Sweden, I'm currently 
            expanding my expertise in full-stack development and modern UI/UX principles. I'm currently studying Java Development whilst practicing other languages and frameworks during my spare time.
          </p>
        </div>
      </section>

      <div className="about-content">
        <section className="about-bio">
          <h2 className="section-title">My Journey</h2>
          <div className="bio-grid">
            <div className="bio-image-wrapper">
              <img src={profilePic} alt="Mats Rönnqvist" className="about-profile-image" />
            </div>
            <div className="bio-text">
              <p>
                With a background in teaching and academics, I have worked both in schools as a teacher, as well as at the univerity of Gothenburg as a PHD student. Although teaching and academics have been a great part of my life, the time has come to move on to new things.
              </p>
              <p>
                My interest in development started with a curiosity about how the web works, 
                which quickly evolved into a passion for building applications that matter. 
                I enjoy the intersection of logic and creativity, constantly learning new 
                technologies to get an insight into, and understand the industry and profession. 
              </p>
              <p>
                Whether it's crafting a responsive frontend or architecting a robust backend, 
                I focus on writing clean, maintainable code and delivering exceptional 
                user experiences.
              </p>
            </div>
          </div>
        </section>

        <section className="skills-section">
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="skills-grid-container">
            {skills.map((group) => (
              <div key={group.category} className="skill-category-group">
                <h3>{group.category}</h3>
                <div className="skills-bento">
                  {group.icons.map((skill) => (
                    <div key={skill.name} className="skill-card-bento">
                      <div className="skill-card-header">
                        {skill.icon}
                        <span>{skill.name}</span>
                      </div>
                      <div className="skill-card-body">
                        {skill.slogan && <p className="skill-slogan">{skill.slogan}</p>}
                        <div className="skill-card-code">
                          <pre><code>{skill.code}</code></pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
