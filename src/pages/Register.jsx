import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/authStore";
import { toast } from "sonner";

export default function Register() {
  const navigate = useNavigate();
  const register = useAuth((s) => s.register);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError("");

    const success = await register(
      values.name,
      values.email,
      values.password
    );

    if (success) {
      toast.success("Registration Successful", {
        description: "You can now login with your credentials.",
      });

      setTimeout(() => navigate("/login"), 1200);
    } else {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">Create Account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Input
            name="name"
            placeholder="Full Name"
            value={values.name}
            onChange={handleChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />

          <Button className="w-full" onClick={handleRegister}>
            Register
          </Button>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-blue-600 hover:underline"
            >
              Already have an account? Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
