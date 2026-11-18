import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import config from "@/payload.config";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { getPayload } from "payload";
import ContactDialog from "./ContactDialog";

export type NavProps = {};

export default async function Nav(props: NavProps) {
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });
  const home = await payload.findGlobal({ slug: "blogInfo" });
  return (
    <>
      <nav className="fixed top-0">
        <div className="mx-auto w-full rounded-sm px-4 py-0.5 sm:w-auto lg:px-6 xl:px-8 2xl:px-10">
          <div className="flex w-full items-center justify-between gap-2 max-[390px]:gap-1 sm:justify-start sm:gap-3 md:gap-4">
            {/* <span className="font-serif text-sm leading-none tracking-wider text-stone-400 uppercase md:text-base">
          {home.description}
        </span> */}
            <div className="flex items-center gap-1 sm:hidden">
              <ContactDialog data={home}>
                <button className="cursor-pointer rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-100/10 max-[390px]:px-1.5 sm:px-3">
                  Contact
                </button>
              </ContactDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="cursor-pointer p-1 hover:bg-sky-100/10">
                    <MenuIcon className="size-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup className="font-mono">
                    <Link href="/">
                      <DropdownMenuItem className="text-[10px] uppercase">
                        Home
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/about">
                      <DropdownMenuItem className="text-[10px] uppercase">
                        About
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden items-center gap-1 max-[390px]:gap-0 sm:flex">
              <Link
                href="/"
                className="rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-100/10 max-[390px]:px-1.5 sm:px-3"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-100/10 max-[390px]:px-1.5 sm:px-3"
              >
                About
              </Link>
              <ContactDialog data={home}>
                <button className="cursor-pointer rounded-xs px-2 py-2 font-mono text-[10px] tracking-widest uppercase duration-150 hover:bg-sky-100/10 max-[390px]:px-1.5 sm:px-3">
                  Contact
                </button>
              </ContactDialog>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
