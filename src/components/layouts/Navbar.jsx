import { Input } from "@/components/ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MobileSidebar from "./MobileSidebar";
import { useAuth } from "@/auth/authStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="h-16 border-b bg-background flex items-center px-4 md:px-6 justify-between">
      {/* Left - Mobile Sidebar + Search */}
      <div className="flex items-center gap-3">
        <MobileSidebar />

        <Input
          placeholder="Search..."
          className="hidden sm:block w-64"
        />
      </div>

      {/* Right - Theme toggle + profile */}
      <div className="flex items-center gap-4">
        <ModeToggle />

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>

        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
