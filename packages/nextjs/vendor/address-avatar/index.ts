/** Address-based SVG avatars shared by wallet UI and third-party address components. */
export const getAddressAvatar = (address: string): string => {
  const normalizedAddress = address.toLowerCase();
  const seed = [...normalizedAddress].reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, 0);
  const hue = seed % 360;
  const initials = normalizedAddress
    .slice(2, 4)
    .replace(/[^a-f0-9]/g, "")
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><linearGradient id="base" x2="1" y2="1"><stop stop-color="hsl(${hue},60%,31%)"/><stop offset="1" stop-color="hsl(${(hue + 65) % 360},65%,19%)"/></linearGradient><radialGradient id="glow" cx=".25" cy=".2" r=".8"><stop stop-color="hsl(${hue},65%,48%)"/><stop offset="1" stop-color="hsl(${hue},65%,48%)" stop-opacity="0"/></radialGradient><clipPath id="circle"><circle cx="50" cy="50" r="50"/></clipPath></defs><g clip-path="url(#circle)"><path fill="url(#base)" d="M0 0h100v100H0z"/><path fill="url(#glow)" d="M0 0h100v100H0z"/><text x="50" y="51" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial,Helvetica,sans-serif" font-weight="600" font-size="30">${initials}</text></g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Compatible with the avatar provider used internally by Scaffold UI.
export const blo = getAddressAvatar;
export default getAddressAvatar;
