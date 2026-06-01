import { useState } from "react";

interface Props {
  onLogin: (password: string) => Promise<void>;
}

export default function LoginModal({ onLogin }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onLogin(password);
    } catch {
      setError("Invalid password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">🔐 Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-indigo-500 transition"
          autoFocus
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
