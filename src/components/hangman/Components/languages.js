import { FaSkull } from "react-icons/fa";

export default function Languages(props) {
  return props.lan.map((lan, i) => {
    if (props.inc > i) {
      return (
        <div key={`language ${i}`} className={`code-box ${lan} incorrect`}>
          {lan === "Node" ? `${lan}.js` : lan}
          <FaSkull className="faskull" />
        </div>
      );
    } else
      return (
        <div key={`language ${i}`} className={`code-box ${lan}`}>
          {lan === "Node" ? `${lan}.js` : lan}
        </div>
      );
  });
}
