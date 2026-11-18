import { BlogInfo } from "@/payload-types";

export type SidebarProps = { info: BlogInfo };

export default async function Sidebar({ info }: SidebarProps) {
  return (
    <aside className="border-creme-200 top-0 z-20 flex shrink-0 flex-col justify-between bg-white p-6 shadow-sm md:sticky md:h-svh md:w-64 lg:w-xs lg:p-8">
      <div className="text-petroleo border-marrom mb-8 border-b-2 pb-6">
        <h1 className="mb-2 font-serif text-3xl leading-[0.9] tracking-tight lg:text-4xl">
          {info.name}
        </h1>
        <p className="text-[10px] leading-snug font-medium tracking-wider text-balance uppercase md:text-xs">
          {info.description}
        </p>
      </div>
      <div className="grid gap-1 text-xs font-medium lg:tracking-wide">
        <p>{info.email}</p>
        <p>{info.phone}</p>
      </div>
    </aside>
  );
}
