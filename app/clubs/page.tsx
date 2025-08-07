
import { redirect } from "next/navigation";
import { createClient } from "@/app/auth/server";
import { Badge } from "@/components/ui/badge";
import { CardContent, Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ClubDialog } from "@/components/club-dialog";

type Club = {
  club_id: any;
  name: any;
  description: any | null;
  profiles: { name: string | null } | null;
  current_book: any | null,
};

export default async function ClubsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // const {data: clubs, error} = await supabase.from("clubs").select("club_id, created_at, creator_id, members, current_book,name, description, profiles!creator_id(name)");
  // console.log("Clubs ", clubs);
  // console.log("Error ", error);
  const { data: clubs, error } = await supabase
    .from("clubs")
    .select("club_id, created_at, creator_id, members, current_book, name, description, profiles!creator_id(name)")
    .contains("members", [user.id]);
    
//   const clubs = [
//     {
//         id: "1",
//         name: "Sci-Fi Bookworms",
//         description: "Explore futuristic and mind-bending science fiction books.",
//         owner: "Alice Johnson",
//     },
//     {
//         id: "2",
//         name: "Historical Fiction Circle",
//         description: "Dive into the past with riveting historical novels.",
//         owner: "Bob Smith",
//     },
//     {
//         id: "3",
//         name: "Poetry & Prose",
//         description: "A quiet space to appreciate poetry and short stories.",
//         owner: "Carla Diaz",
//     },
//     {
//         id: "4",
//         name: "Fantasy Realms",
//         description: "Discuss dragons, magic, and epic adventures.",
//         owner: "David Lee",
//     },
//     {
//         id: "5",
//         name: "Mystery & Thriller Society",
//         description: "Solve fictional crimes and uncover dark secrets.",
//         owner: "Eve Watson",
//     },
//     ];

console.log("Club Data From Server:", JSON.stringify(clubs, null, 2));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Clubs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* {clubs?.map((club) => (
          <Link key={club.club_id} href={`/clubs/${club.club_id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex flex-row items-start justify-between">
                  <CardTitle>{club.name}</CardTitle>
                  <Badge>{`#${club.club_id}`}</Badge>
                </div>
                <CardDescription>{club.description}</CardDescription>
                
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Created by: {(club.profiles as unknown as { name: string })?.name || "Unknown"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))} */}

        {clubs?.map((club) => (
          <ClubDialog key={club.club_id} club={club as unknown as Club} user={user}/>
        ))}

        

        {!clubs?.length && (
          <p className="text-muted-foreground col-span-full">No clubs found.</p>
        )}
      </div>
    </div>
  );
}
