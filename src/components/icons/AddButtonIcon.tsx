export function AddButtonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="10" fill="#D9D9D9" />
      <path
        d="M10 8V12M8 10H12"
        stroke="#454545"
        strokeWidth="0.571429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
