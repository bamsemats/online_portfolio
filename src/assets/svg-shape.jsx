export default function SvgShape({ children, width = 200, height = 60, onClick, className }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={width}
      height={height}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      className={className}
    >
      <path
        d="M75 0 L100 25 L100 100 L0 100 L0 0 Z"
        fill="var(--btn-bg)"
        rx="10"
        ry="10"
      />
      <text
        x="50%"
        y="60%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="var(--text-body)"
        fontSize="2rem"
        fontFamily="inherit"
      >
        {children}
      </text>
    </svg>
  );
}
