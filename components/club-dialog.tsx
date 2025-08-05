
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


type Profile = { name: string | null };

type Request = {
  request_id: any;
  profiles: { name: string | null } | null; // profiles is an array of objects
};

type Club = {
  club_id: any;
  name: any;
  description: any | null;
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

  useEffect(() => {
    if (isOpen && user) {
      const fetchRequests = async () => {
        setIsLoading(true);
        const supabase = createSupabaseBrowserClient();
        console.log("Supabase")
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
          setRequests(fetchedRequests as any[]);
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