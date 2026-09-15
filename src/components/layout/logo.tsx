import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center", className)} aria-label="Blugent home">
      <Image
        src="/images/blugent-logo2.png"
        alt="Blugent"
        width={1942}
        height={809}
        className="h-auto w-[110px] transition-transform duration-300 group-hover:scale-105 sm:w-[130px] lg:w-[150px]"
        priority
      />
    </Link>
  );
}
