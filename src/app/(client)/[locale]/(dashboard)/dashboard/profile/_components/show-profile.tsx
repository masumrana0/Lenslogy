import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon, MailIcon, LockIcon } from "lucide-react";
import { IUser } from "../../users/_interface/user.interface";

const ShowProfile = ({ user }: { user: IUser }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt="Profile" />
          <AvatarFallback>
            {user.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="space-y-4">
        <div className="grid gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserIcon className="h-4 w-4" />
            <span>Name</span>
          </div>
          <p className="font-medium">{user?.name}</p>
        </div>

        <div className="grid gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MailIcon className="h-4 w-4" />
            <span>Email</span>
          </div>
          <p className="font-medium">{user?.email}</p>
        </div>

        <div className="grid gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Designation</span>
          </div>
          <p className="font-medium">{user?.designation || "Not specified"}</p>
        </div>

        <div className="grid gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Role</span>
          </div>
          <p className="font-medium">{user?.role}</p>
        </div>

        <div className="grid gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LockIcon className="h-4 w-4" />
            <span>Password</span>
          </div>
          <p className="font-medium">••••••••</p>
        </div>
      </div>
    </div>
  );
};

export default ShowProfile;
