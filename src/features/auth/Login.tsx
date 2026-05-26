import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector, setTheme, setAuthenticated } from "@core";
import sessionConfig from "@assets/config/session.json";
import { Swords, Shield, ArrowLeft } from "lucide-react";
import DecisionScreen from "./DecisionScreen";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.os.theme);

  const [step, setStep] = useState<
    "choose_side" | "login" | "register" | "forgot_password" | "validate_key"
  >("choose_side");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("demo@edu-os.local");
  const [password, setPassword] = useState("demo-123");
  const [recoveryCode, setRecoveryCode] = useState("");

  const handleSelectSide = (selectedTheme: "jedi" | "sith") => {
    dispatch(setTheme(selectedTheme));
    setStep("login");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionConfig.demoMode) {
      dispatch(setAuthenticated(true));
      navigate({ to: "/desktop" });
    } else {
      alert("Mock: Validating credentials with API...");
      dispatch(setAuthenticated(true));
      navigate({ to: "/desktop" });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mock: Creating account with API...");
    setStep("login");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mock: Sending recovery email...");
    setStep("validate_key");
  };

  const handleValidateKey = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mock: Validating key and resetting password...");
    setStep("login");
  };

  const inputClass = `w-full px-4 py-3 rounded-lg bg-black/50 border outline-none text-white transition-all ${
    theme === "jedi"
      ? "border-green-500/30 focus:border-green-400 focus:shadow-[0_0_10px_rgba(74,222,128,0.5)]"
      : "border-red-500/30 focus:border-red-500 focus:shadow-[0_0_10px_rgba(248,113,113,0.5)]"
  }`;

  const buttonClass = `w-full py-3 rounded-lg font-bold uppercase tracking-wider text-white transition-all ${
    theme === "jedi"
      ? "bg-green-600 hover:bg-green-500 hover:shadow-[0_0_15px_rgba(74,222,128,0.6)]"
      : "bg-red-700 hover:bg-red-600 hover:shadow-[0_0_15px_rgba(248,113,113,0.6)]"
  }`;

  const linkClass =
    "text-sm text-gray-400 hover:text-white transition-colors cursor-pointer text-center block mt-4";
  const titleClass = `text-3xl font-bold uppercase tracking-wider ${theme === "jedi" ? "text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]" : "text-red-500 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]"}`;

  if (step === "choose_side") {
    return <DecisionScreen onSelectSide={handleSelectSide} />;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 overflow-hidden relative">
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${theme === "jedi" ? "opacity-20 bg-green-900" : theme === "sith" ? "opacity-20 bg-red-900" : "opacity-10 bg-gray-800"}`}
      ></div>

      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-black/40 shadow-2xl border border-white/20">

        {step === "login" && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className={titleClass}>
                {theme === "jedi" ? "The Light Side" : "The Dark Side"}
              </h2>
              <p className="text-gray-400 mt-2">Enter your credentials</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
              />

              <button type="submit" className={buttonClass}>
                {sessionConfig.demoMode ? "Demo Login" : "Login"}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-2">
              <span onClick={() => setStep("forgot_password")} className={linkClass}>
                Forgot password?
              </span>
              <span onClick={() => setStep("register")} className={linkClass}>
                Don't have an account? Sign up
              </span>
              <span onClick={() => setStep("choose_side")} className={linkClass}>
                Change Path
              </span>
            </div>
          </div>
        )}

        {step === "register" && (
          <div className="animate-fade-in">
            <button
              onClick={() => setStep("login")}
              className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div className="text-center mb-8">
              <h2 className={titleClass}>Join the Order</h2>
              <p className="text-gray-400 mt-2">Create your account</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
              />

              <button type="submit" className={buttonClass}>
                Create Account
              </button>
            </form>

            <span onClick={() => setStep("login")} className={linkClass}>
              Already have an account? Login
            </span>
          </div>
        )}

        {step === "forgot_password" && (
          <div className="animate-fade-in">
            <button
              onClick={() => setStep("login")}
              className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div className="text-center mb-8">
              <h2 className={titleClass}>Recovery</h2>
              <p className="text-gray-400 mt-2">Enter your email to receive a code</p>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-6">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                required
              />
              <button type="submit" className={buttonClass}>
                Send Recovery Code
              </button>
            </form>
          </div>
        )}

        {step === "validate_key" && (
          <div className="animate-fade-in">
            <button
              onClick={() => setStep("forgot_password")}
              className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <div className="text-center mb-8">
              <h2 className={titleClass}>Reset Password</h2>
              <p className="text-gray-400 mt-2">Enter the code sent to your email</p>
            </div>

            <form onSubmit={handleValidateKey} className="space-y-6">
              <input
                type="text"
                placeholder="Recovery Code"
                value={recoveryCode}
                onChange={(e) => setRecoveryCode(e.target.value)}
                className={inputClass}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                required
              />
              <button type="submit" className={buttonClass}>
                Reset Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
