import type { SVGProps } from "react";

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MoonIcon() {
  return (
    <Icon>
      <path d="M20.4 15.1A8.7 8.7 0 0 1 8.9 3.6a8.7 8.7 0 1 0 11.5 11.5Z" />
    </Icon>
  );
}

export function SunIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Icon>
  );
}

export function CopyIcon() {
  return (
    <Icon>
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </Icon>
  );
}

export function ShareIcon() {
  return (
    <Icon>
      <circle cx="18" cy="5" r="2.2" />
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="18" cy="19" r="2.2" />
      <path d="m8 11 8-5M8 13l8 5" />
    </Icon>
  );
}

export function ShuffleIcon() {
  return (
    <Icon>
      <path d="M4 7h2.5c4.5 0 4.5 10 9 10H20M17 14l3 3-3 3M4 17h2.5c1.6 0 2.6-1.2 3.5-2.7M14 7.8c.5-.5 1-.8 1.5-.8H20M17 4l3 3-3 3" />
    </Icon>
  );
}

export function ChevronIcon({ direction }: { direction: "next" | "previous" }) {
  return (
    <Icon>
      {/* Forward follows the reading direction in an RTL interface. */}
      <path d={direction === "next" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </Icon>
  );
}
