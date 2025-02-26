import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import AuthButton from "./components/AuthButton";
import NavBar from "./components/NavBar";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <>
      <NavBar session={session} />
      <main className="max-w-2xl mx-auto p-4">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center">
          <h1 className="text-4xl font-bold">Bienvenido a MiduTwitter</h1>
          {!session ? (
            <>
              <p className="text-gray-600 max-w-md">
                Inicia sesión con GitHub para empezar a compartir tus pensamientos con el mundo.
              </p>
              <AuthButton session={session} />
            </>
          ) : (
            <>
              <p className="text-gray-600">
                Ya estás autenticado. ¿Quieres ir a ver los posts?
              </p>
              <a
                href="/dashboard"
                className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
              >
                Ir al Dashboard
              </a>
            </>
          )}
        </div>
      </main>
    </>
  );
}

