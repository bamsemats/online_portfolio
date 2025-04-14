import "./pages.css";
import "./media-queries.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page-intro">
        <h3>Welcome to my portfolio webpage!</h3>
        <article>
          This will be the landing page. Here I will put previews of the other
          pages - clickable. In this section I will write a short summary.
          Preview cards maybe expandable on hover?
        </article>
      </div>
      <div className="home-container">
        <div className="preview-card preview-apps">Apps preview card</div>
        <div className="preview-card preview-about">About me preview card</div>
        <div className="preview-card preview-contact">Contact preview card</div>
      </div>
    </div>
  );
}
