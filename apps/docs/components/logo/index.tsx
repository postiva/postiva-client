import Image from "next/image";

export function Logo() {
  return (
    <div className="relative mr-0.5">
      <Image
        className="mb-1.5"
        src="/navbar_logo.png"
        alt="Logo"
        width={110}
        height={110}
      />
      <div className="absolute -right-2.5 top-0.5 text-muted-foreground hover:text-accent-foreground">
        .
      </div>
    </div>
  );
}
