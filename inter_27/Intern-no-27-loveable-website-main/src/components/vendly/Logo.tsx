import logo from "@/assets/vendly-logo.png.asset.json";

export function Logo({ size = 32, showWordmark = true, className = "" }: { size?: number; showWordmark?: boolean; className?: string }) {
  // The uploaded asset is a full lockup (mark + wordmark). We show it as-is;
  // when showWordmark is false we crop to the square mark via aspect.
  if (showWordmark) {
    return (
      <img
        src={logo.url}
        alt="Vendly"
        height={size}
        style={{ height: size, width: "auto" }}
        className={"object-contain dark:brightness-110 " + className}
      />
    );
  }
  return (
    <img
      src={logo.url}
      alt="Vendly"
      style={{ height: size, width: size, objectFit: "cover", objectPosition: "left center" }}
      className={"dark:brightness-110 " + className}
    />
  );
}
