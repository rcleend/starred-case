import Jobs from "@/features/jobs";
import { getFavouriteJobIds, getJobs } from "@/lib/api/server";
import { getServerSession } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AllJobsPage() {
  const session = await getServerSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  const initialJobs = await getJobs(0);
  const initialFavouriteJobIds = await getFavouriteJobIds(session.id);

  return (
    <Jobs
      initialJobs={initialJobs}
      initialFavouriteJobIds={initialFavouriteJobIds}
    />
  );
}
