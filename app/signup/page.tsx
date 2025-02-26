import SignUpForm from '@/components/SignUpForm'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Crea tu cuenta en MiduTwitter
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              inicia sesión si ya tienes cuenta
            </a>
          </p>
        </div>
        
        <SignUpForm />
      </div>
    </div>
  )
} 