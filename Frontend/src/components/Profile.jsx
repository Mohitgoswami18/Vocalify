import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiUpload } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const Profile = () => {
  const param = useParams();
  const username = param.username;

  const [image, setImage] = useState(null);
  const [isToggled, setIsToggled] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userData, setUserData] = useState(null);

  /* ---------------- fetch user ---------------- */
  useEffect(() => {
    if (!username) return;

    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:10000/api/v1/user/details?username=${username}`
        );
        setUserData(res.data.user);
        setDataLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [username]);

  /* ---------------- upload profile pic ---------------- */
  const handleProfilePicUpload = async () => {
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("profilePic", image);
      formData.append("username", username);
      const res = await axios.post(
        "http://localhost:10000/api/v1/user/update-profile-picture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      // brute-force refresh UI
      setUserData((prev) => ({
        ...prev,
        profilePic: res.data.profilePic,
      }));

      setIsToggled(false);
      setImage(null);
    } catch (error) {
      if (error.response) {
        console.log("❌ Response error:");
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("❌ No response received:");
        console.log(error.request);
      } else {
        console.log("❌ Axios config error:");
        console.log(error.message);
      }
    }

  };

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
          <div className="flex items-center gap-4 relative">
            <div className="relative group">
              {userData?.profilePic ? (
                <img
                  src={userData.profilePic}
                  className="h-16 w-16 rounded-full object-cover cursor-pointer"
                  onClick={() => setIsToggled((p) => !p)}
                />
              ) : (
                <Avatar
                  className="cursor-pointer"
                  onClick={() => setIsToggled((p) => !p)}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}

              {/* Upload / Cross icon */}
              <div
                onClick={() => setIsToggled((p) => !p)}
                className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
              >
                {isToggled ? <MdOutlineCancel /> : <FiUpload />}
              </div>
            </div>

            {/* File Input */}
            {isToggled && (
              <div className="flex gap-2 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="text-sm"
                />
              </div>
            )}

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
            <Button onClick={handleProfilePicUpload}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
