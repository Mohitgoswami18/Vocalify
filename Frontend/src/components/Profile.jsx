import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
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
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://i.pravatar.cc/150?img=32" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-semibold">Alex Johnson</p>
              <p className="text-sm text-muted-foreground">
                Lead Product Designer
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input defaultValue="Alex Johnson" />
            </div>

            <div>
              <label className="text-sm font-medium">Joined on</label>
              <Input defaultValue="28 Jan, 2026" />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="alex.johnson@example.com" />
            </div>
          </div>

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
