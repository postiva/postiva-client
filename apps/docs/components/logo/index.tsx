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
    </div>
  );
}
