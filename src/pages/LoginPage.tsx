import { useState, FormEvent, ChangeEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import Galaxy from "@/components/Galaxy";
import LoginForm from "@/components/Login/LoginForm";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [formVisible, setFormVisible] = useState<"form1" | "form2" | null>(
    null
  );
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useHotkeys("a", () => setFormVisible("form1"));
  useHotkeys(import.meta.env.VITE_HOT_KEY_FORM1, () => setFormVisible("form1"));
  useHotkeys(import.meta.env.VITE_HOT_KEY_FORM2, () => setFormVisible("form2"));

  useHotkeys("esc", () => setFormVisible(null));

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let email: string;
    if (formVisible === "form1") {
      email = import.meta.env.VITE_ADMIN_EMAIL;
    } else if (formVisible === "form2") {
      email = import.meta.env.VITE_ANOM_EMAIL;
    } else {
      alert("Selecciona un formulario válido");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      onLogin(userCredential.user);
      navigate("/home");
    } catch (error) {
      setFormVisible(null);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "black",
      }}
    >
      <div className="absolute inset-0">
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={2.5}
          glowIntensity={0.5}
          saturation={0.2}
          hueShift={240}
        />
      </div>
      {formVisible && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <LoginForm
            handleLogin={handleLogin}
            formVisible={formVisible}
            changePassword={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>
      )}
    </div>
  );
}
