import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Ashwin",
    email: "ash@example.com",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    console.log("Saving profile:", profile);
  };

  const changePassword = () => {
    console.log("Password update:", passwords);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-1 block">Name</Label>
            <Input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Your name"
            />
          </div>

          <div>
            <Label className="mb-1 block">Email</Label>
            <Input
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Your email"
            />
          </div>

          <Button onClick={saveProfile} className="mt-4">
            Save Profile
          </Button>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label className="mb-1 block">Current Password</Label>
            <Input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
            />
          </div>

          <div>
            <Label className="mb-1 block">New Password</Label>
            <Input
              type="password"
              name="newPass"
              value={passwords.newPass}
              onChange={handlePasswordChange}
            />
          </div>

          <div>
            <Label className="mb-1 block">Confirm Password</Label>
            <Input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
            />
          </div>

          <Button onClick={changePassword}>Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
