import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  formVisible: "form1" | "form2";
  changePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginForm({
  handleLogin,
  formVisible,
  changePassword,
}: LoginFormProps) {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    changePassword(e);
  };

  return (
    <Card className="w-full max-w-sm shadow-2xl pointer-events-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          {formVisible === "form1" ? "Admin Account" : "Anonymous Account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          onClick={() => {
            const form = document.querySelector("form");
            if (form)
              form.dispatchEvent(new Event("submit", { bubbles: true }));
          }}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
