import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import AuthButton from "./components/AuthButton";
import NavBar from "./components/NavBar";

export default async function Home() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <>
      <NavBar session={session} />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:w-1/2 space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
                <span className="block">Comparte tus ideas</span>
                <span className="block text-blue-600">con el mundo</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Únete a nuestra comunidad y comparte tus pensamientos con personas de todo el mundo.
                Una plataforma moderna y segura para expresarte.
              </p>
              <div className="flex flex-col items-center sm:items-start">
                {!session && <AuthButton session={session} />}
                {session && (
                  <a
                    href="/dashboard"
                    className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Ir al Dashboard
                    <svg
                      className="w-5 h-5 ml-2 -mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="relative">
                <div className="w-full rounded-2xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-2/5 mb-2"></div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

