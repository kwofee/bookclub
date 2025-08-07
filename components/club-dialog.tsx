
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
import { toast } from "sonner";

type Profile = { name: string | null };

type Request = {
  request_id: any;
  profiles: { name: string | null } | null; 
};

type Club = {
  club_id: any;
  name: any;
  description: any | null;
  profiles: { name: string | null } | null;
  current_book: any | null;
};

type FullRequest = {
  request_id: any,
  created_at: any,
  club_id_request: any,
  processed: any,
  request_user_id: any,
}

interface ClubDialogProps {
  club: Club;
  user: User | null;
}

interface RequestProps{
  request: Request
};


export function ClubDialog({ club, user }: ClubDialogProps) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      const fetchRequests = async () => {
        setIsLoading(true);
        const supabase = createSupabaseBrowserClient();
        // console.log("Supabase")
        
        const { data: fetchedRequests, error } = await supabase
          .from("requests")
          .select("request_id, profiles!request_user_id(name)")
          .eq("club_id_request", club.club_id)
          .eq("processed", false);

        if (error) {
          console.error("Error fetching requests:", error);
        } else if (fetchedRequests) {
          // console.log("Fetched Requests:", fetchedRequests);
          setRequests(fetchedRequests as any[]);
        }
        setIsLoading(false);
      };
      
      fetchRequests();
    }
  }, [isOpen, user, club.club_id]);

  const requestApproval = async (reqToApprove: Request) => {
    const supabase = createSupabaseBrowserClient();
    const {data: req, error} = await supabase.from("requests").select("*").eq("request_id", reqToApprove.request_id).single();
    if(error){
      toast.error(error.message);
    }else{
      const {data: modClub, error} = await supabase.rpc("append_member_to_club",{
        p_request_id: (req as unknown as FullRequest).request_id,
        club_id_to_update: (req as unknown as FullRequest).club_id_request,
        new_member_id: (req as unknown as FullRequest).request_user_id,
      })

      if(error){
        toast.error(`Failed to join club ${error.message}`);
      }else{
        toast(modClub);
      }
    }
  };
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
          <DialogTitle>{club.name}</DialogTitle>
        </DialogHeader>
        <div className="my-4">
            <h3 className="text-lg font-medium mb-2 text-foreground">Currently Reading</h3>
            <Card className="bg-muted/50 p-4 flex items-center gap-4">
                
                <div className="space-y-1">
                    <CardTitle className="text-xl">{club.current_book || "No book selected"}</CardTitle>
                    <CardDescription>
                        {club.description}
                    </CardDescription>
                </div>
            </Card>
        </div>
        
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
                      {req.profiles?.name || "Unknown User"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button onClick={() => requestApproval(req)} size="sm">Approve</Button>
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