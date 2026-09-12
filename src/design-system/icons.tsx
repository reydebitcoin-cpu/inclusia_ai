import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };
type IconName = keyof typeof paths;

const paths = {
  Alert: "M12 3 2.8 20h18.4L12 3Zm0 6v5m0 3h.01",
  ArrowUp: "m5 12 7-7 7 7M12 19V5",
  Bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 13h6",
  Bolt: "m13 2-9 12h7l-1 8 9-12h-7l1-8Z",
  Bot: "M12 8V4m-3 4h6M7 13h.01M17 13h.01M8 17h8M5 10h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z",
  Building: "M4 21V5l8-3 8 3v16M8 8h1m3 0h1m3 0h1M8 12h1m3 0h1m3 0h1M8 16h1m3 0h1m3 0h1M10 21v-4h4v4",
  Car: "m3 13 2-6h14l2 6m-18 0v5h3v-2h12v2h3v-5m-15 0h12M7 10h.01M17 10h.01",
  Cart: "M3 4h2l2 11h10l3-8H6m1 11h.01M17 18h.01",
  Chart: "M4 19V5m0 14h16M8 16v-5m4 5V7m4 9v-8",
  Check: "m5 12 4 4L19 6",
  Chevron: "m6 9 6 6 6-6",
  Clock: "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  Coins: "M7 6c0-2 2-3 5-3s5 1 5 3-2 3-5 3-5-1-5-3Zm0 0v5c0 2 2 3 5 3s5-1 5-3V6M3 10c0 2 2 3 5 3m-5-3v5c0 2 2 3 5 3h1m-6-3c0 2 2 3 5 3m10-8c0 2-2 3-5 3",
  Command: "M9 3 6 6l3 3m6-6 3 3-3 3M3 9l3 3-3 3m18-6-3 3 3 3M9 15l3 3 3-3m-3-12v18M3 12h18",
  Download: "M12 3v12m0 0 5-5m-5 5-5-5M5 21h14",
  Grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  Logout: "M10 17l5-5-5-5m5 5H3m9-9V3h7v18h-7v-3",
  Menu: "M4 6h16M4 12h16M4 18h16",
  Moon: "M20 15.5A8.5 8.5 0 0 1 8.5 4 8 8 0 1 0 20 15.5Z",
  Paw: "M8 12c-2-1-5 0-5 3 0 2 2 3 4 2l2-1h6l2 1c2 1 4 0 4-2 0-3-3-4-5-3m-7-4c-1-2-3-3-4-2s0 4 2 5m9-3c1-2 3-3 4-2s0 4-2 5M9 7c0-2 1-3 2-3s2 2 1 4m3-1c0-2-1-3-2-3s-2 2-1 4",
  Search: "m20 20-4.5-4.5m2-5.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z",
  Shield: "M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4",
  Sparkles: "m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Zm7 13 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z",
  Sun: "M12 3v2m0 14v2M3 12h2m14 0h2m-3.4-6.6-1.4 1.4M7.4 16.6 6 18m12 0-1.4-1.4M7.4 7.4 6 6m11 6a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z",
  Users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7-8a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9",
  Wallet: "M4 6h16v14H4a2 2 0 0 1-2-2V6m2 0a2 2 0 0 1 2-2h12v2m0 7h4v4h-4a2 2 0 0 1 0-4Z",
  X: "m6 6 12 12M18 6 6 18",
} as const;

function makeIcon(name: IconName) {
  return function Icon({ size = 24, strokeWidth = 1.8, ...props }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
        <path d={paths[name]} />
      </svg>
    );
  };
}

export const IconAlert = makeIcon("Alert");
export const IconArrowUp = makeIcon("ArrowUp");
export const IconBell = makeIcon("Bell");
export const IconBolt = makeIcon("Bolt");
export const IconBot = makeIcon("Bot");
export const IconBuilding = makeIcon("Building");
export const IconCar = makeIcon("Car");
export const IconCart = makeIcon("Cart");
export const IconChart = makeIcon("Chart");
export const IconCheck = makeIcon("Check");
export const IconChevron = makeIcon("Chevron");
export const IconClock = makeIcon("Clock");
export const IconCoins = makeIcon("Coins");
export const IconCommand = makeIcon("Command");
export const IconDownload = makeIcon("Download");
export const IconGrid = makeIcon("Grid");
export const IconLogout = makeIcon("Logout");
export const IconMenu = makeIcon("Menu");
export const IconMoon = makeIcon("Moon");
export const IconPaw = makeIcon("Paw");
export const IconSearch = makeIcon("Search");
export const IconShield = makeIcon("Shield");
export const IconSparkles = makeIcon("Sparkles");
export const IconSun = makeIcon("Sun");
export const IconUsers = makeIcon("Users");
export const IconWallet = makeIcon("Wallet");
export const IconX = makeIcon("X");