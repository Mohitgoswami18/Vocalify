import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios"

const Profile = () => {

  const param = useParams();
  const username = param.username
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  console.log(userData)

  useEffect(() => {
      if(!username) return;
      // Fetch user data
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/user/details?username=${username}`,
          );
          setDataLoaded(true);
          setUserData(response.data.user);
          // console.log("User Data:", response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
  
      fetchUserData();
    }, [username]);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">User Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <img className="h-16 w-16 rounded-full"
            src = {userData?.profilePic}>
            </img>

            <div>
              <p className="font-semibold">{userData?.username || username}</p>
              <p className="text-sm text-muted-foreground">
                Lead Product Designer
              </p>
            </div>
          </div>

          {/* Form */}
          {dataLoaded ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input defaultValue={userData.username} />
              </div>

              <div>
                <label className="text-sm font-medium">Joined on</label>
                <Input defaultValue={userData.updatedAt.slice(0, 10)} />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue={userData.email} />
              </div>
            </div>
          ) : (
            <Skeleton className="h-4 w-full" />
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
