// "use client";

// import { motion } from "framer-motion";
// import LoginForm from "@/components/auth/LoginForm";
// import AnimatedDiv from "@/components/ui/AnimatedDiv";
// import Link from "next/link";

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <AnimatedDiv className="w-full max-w-md">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-xl shadow-lg p-8"
//         >
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
//             <p className="text-gray-600 mt-2">Sign in to your account</p>
//           </div>
//           <LoginForm />
//           <div className="mt-4 text-center text-sm text-gray-600">
//             <p>
//               {"Register "}
//               <Link href="/register" className="text-blue-600 hover:underline">
//                 {"here"}
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </AnimatedDiv>
//     </div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { dummyUser } from "@/lib/dummy";

export default function LoginPage() {
  const [email_instansi, setEmail_instansi] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = dummyUser.find(
      (u) => u.email_instansi === email_instansi && u.password === password
    );
    if (!user) {
      alert("email atau password salah");
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <AnimatedDiv className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                value={email_instansi}
                onChange={(e) => setEmail_instansi(e.target.value)}
                required
                className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Register{" "}
              <a href="#" className="text-blue-600 hover:underline">
                here
              </a>
            </p>
          </div>
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
