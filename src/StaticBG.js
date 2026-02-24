export default function StaticBG(props) {
  return (
    <div className="static-bg">
      <div className="token-1">{`{ ${props.current} }`}</div>
      {/* <div className="token-2">{`<>`}</div>
      <div className="token-3">{`^$`}</div>
      <div className="token-4">{`=""`}</div>
      <div className="token-5">{`@`}</div> */}
    </div>
  );
}
