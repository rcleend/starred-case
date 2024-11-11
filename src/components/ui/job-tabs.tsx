"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function JobTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab = pathname === "/jobs/favourites" ? "favourites" : "all";

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      <Tabs
        value={currentTab}
        onValueChange={(value) => router.push(`/jobs/${value}`)}
        className="w-full max-w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="favourites">Favourites</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
