import Link from 'next/link'

export default function AuthError() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error de Autenticación</h1>
        <p className="text-gray-600 mb-8">
          Ha ocurrido un error durante el proceso de autenticación. Por favor, intenta nuevamente.
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </main>
  )
} 