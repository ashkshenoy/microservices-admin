import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuth((s) => s.login);
  
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setError("");

    // Call async login
    const success = await login(values.email, values.password);

    if (success) {
      navigate("/");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

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

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
          <div className="text-center pt-2">
            <button
              onClick={() => navigate("/register")}
              className="text-sm text-blue-600 hover:underline"
            >
              Don't have an account? Register
            </button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
