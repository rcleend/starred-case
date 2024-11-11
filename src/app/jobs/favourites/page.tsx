import Favourites from "@/features/favourites";
import { getFavouriteJobIds, getJobsById } from "@/lib/api/server";
import { getServerSession } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function FavouritesPage() {
  const session = await getServerSession();

  if (!session) {
    throw new Error("User not logged in");
  }

  const initialFavouriteJobIds = await getFavouriteJobIds(session.id);
  const initialFavouriteJobs = await getJobsById(initialFavouriteJobIds);

  return (
    <Favourites
      initialFavouriteJobs={initialFavouriteJobs}
      initialFavouriteJobIds={initialFavouriteJobIds}
    />
  );
}
