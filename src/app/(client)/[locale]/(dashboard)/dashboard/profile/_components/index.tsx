"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PencilIcon } from "lucide-react";
import { IUser } from "../../users/_interface/user.interface";
import EditProfile from "./edit-profile";
import ShowProfile from "./show-profile";

const ProfilePage = ({ user }: { user: IUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              View and manage your profile information.
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              <PencilIcon className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <EditProfile user={user} setIsEditing={setIsEditing} />
          ) : (
            <ShowProfile user={user} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
