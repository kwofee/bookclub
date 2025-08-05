// "use client"

// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import Link from "next/link"
// import { Card,CardHeader, CardTitle, CardFooter, CardAction, CardContent, CardDescription } from "./ui/card"
// import { Badge } from "./ui/badge"
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { User } from "@supabase/supabase-js"
// import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client"
// import { redirect } from "next/navigation"
// import { useState } from "react"
// import { useEffect } from "react"

// type Club = { club_id: any; created_at: any; creator_id: any; members: any; current_book: any; name: any; description: any; profiles: { name: any; }[]; }

// interface ClubDialogProps {
//     club: Club;
//     user: User | null;
// }

// // type Request = {request_id: any, created_at: any, club_id_request: any, processed: any, request_user_id: any}
// type Request = { request_id: any; processed: any; profiles: { name: string | null }[] | null; }

// export function ClubDialog({club, user}: ClubDialogProps) {
//   const [requests, setRequests] = useState<Request[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);


//   useEffect(() => {
//     // Only fetch if the dialog is open
//     if (isOpen) {
//       const fetchRequests = async () => {
        
//         setIsLoading(true);
//         const supabase = createSupabaseBrowserClient();
        
//         const { data: myClubs, error } = await supabase
//         .from('clubs')
//         .select('*')
//         .eq('creator_id', user.id);

//         console.log('My Clubs:', myClubs);
      
//         // Fetch requests specific to this club
//         // const { data: fetchedRequests, error } = await supabase
//         //   .from("requests")
//         //   .select("request_id, processed, profiles!request_user_id(name)")
//         //   .eq("club_id_request", club.club_id)
//         //   .eq("processed", false);
        
//         // const { data: fetchedRequests, error } = await supabase
//         // .from('clubs')
//         // .select(`
//         //   *,
//         //   requests!inner (
//         //     *
//         //   )
//         // `)
//         // .eq('creator_id', user.id);
//         // if (error) {
//         //   console.error("Error fetching requests:", error);
//         // } else if (fetchedRequests) {
//         //   console.log(fetchedRequests)
//         //   setRequests(fetchedRequests as Request[]);
//         // }
//         // setIsLoading(false);
//       };

//       fetchRequests();
//     }
//   }, [isOpen, user, club.club_id]); // Dependencies for the effect
//   // console.log("Hello");
//   // console.log("User id", user.id);
//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <form>
//         <DialogTrigger asChild>
//             <Card className="hover:shadow-lg transition-shadow cursor-pointer">
//               <CardHeader>
//                 <div className="flex flex-row items-start justify-between">
//                   <CardTitle>{club.name}</CardTitle>
//                   <Badge>{`#${club.club_id}`}</Badge>
//                 </div>
//                 <CardDescription>{club.description}</CardDescription>
                
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-muted-foreground">
//                   Created by: {(club.profiles as unknown as { name: string })?.name || "Unknown"}
//                 </p>
//               </CardContent>
//             </Card>
          
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>{club.name}</DialogTitle>
//             <DialogDescription>
//               {club.description || ""}
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4">
//             <Table>
//               <TableCaption>Pending requests for this club</TableCaption>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[100px]">Request ID</TableHead>
//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {isLoading ? (
//                   <TableRow>
//                     <TableCell>Loading</TableCell>
//                   </TableRow>
//                 ) : requests.length > 0 ? (
//                   requests.map((req) => (
//                     <TableRow key={req.request_id}>
//                       <TableCell>{req.request_id}</TableCell>
//                       <TableCell>
//                         {req.profiles?.[0] || "Unknown User"}
//                       </TableCell>
//                       <TableCell className="text-right">
//                       <Button size="sm">Approve</Button>
//                     </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell>No pending requests</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//           <DialogFooter>
//             <DialogClose asChild>
//               <Button variant="outline">Cancel</Button>
//             </DialogClose>
//             <Button type="submit">Save changes</Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   )
// }


"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser-client";

// Use specific types for your data
// type Request = {
//   request_id: number;
//   profiles: { name: string | null } | null; // Profile is an object, not an array here
// };

type Request = { request_id: any; profiles: { name: any; }[]; };
type Club = {
  club_id: number;
  name: string;
  description: string | null;
  profiles: { name: string | null } | null;
};

interface ClubDialogProps {
  club: Club;
  user: User | null;
}

export function ClubDialog({ club, user }: ClubDialogProps) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // 1. REMOVED the if(!user){redirect(...)} block. It's not needed here.

  useEffect(() => {
    if (isOpen && user) {
      const fetchRequests = async () => {
        setIsLoading(true);
        const supabase = createSupabaseBrowserClient();

        // 2. This is the CORRECT query to fetch requests for the currently opened club
        const { data: fetchedRequests, error } = await supabase
          .from("requests")
          .select("request_id, profiles!request_user_id(name)")
          .eq("club_id_request", club.club_id)
          .eq("processed", false);

        if (error) {
          console.error("Error fetching requests:", error);
        } else if (fetchedRequests) {
          console.log("Fetched Requests:", fetchedRequests);
          setRequests(fetchedRequests as Request[]);
        }
        setIsLoading(false);
      };

      fetchRequests();
    }
  }, [isOpen, user, club.club_id]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
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
              Created by: {club.profiles?.name || "Unknown"}
            </p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Pending Requests for "{club.name}"</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Table>
            <TableCaption>Users who want to join this club.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : requests.length > 0 ? (
                requests.map((req) => (
                  <TableRow key={req.request_id}>
                    <TableCell>
                      {/* 3. Correctly display the user's name from the nested object */}
                      {req.profiles?.name || "Unknown User"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Approve</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">No pending requests.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}