'use client'

import { Session } from '@supabase/supabase-js'
import { createClient } from '@/app/utils/supabase/client'
import { useState } from 'react'

export default function AuthButton({ session }: { session: Session | null }) {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const supabase = createClient()

  const handleSignIn = async (provider: 'github' | 'google' | 'discord') => {
    try {
      setIsLoading(provider)
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/auth/callback`
        }
      })
      
      if (error) throw error
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(null)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  const providers = [
    {
      name: 'github',
      color: 'bg-[#24292F]',
      hoverColor: 'hover:bg-[#24292F]/90',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" />
        </svg>
      ),
      text: 'Continuar con GitHub'
    },
    {
      name: 'google',
      color: 'bg-white',
      textColor: 'text-gray-900',
      hoverColor: 'hover:bg-gray-100',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
      text: 'Continuar con Google'
    },
    {
      name: 'discord',
      color: 'bg-[#7289DA]',
      hoverColor: 'hover:bg-[#7289DA]/90',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      text: 'Continuar con Discord'
    }
  ]

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
      {session === null ? (
        <>
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Iniciar sesión
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Elige tu método preferido para continuar
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            {providers.map((provider) => (
              <button
                key={provider.name}
                onClick={() => handleSignIn(provider.name as 'github' | 'google' | 'discord')}
                disabled={isLoading !== null}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 ${
                  provider.color
                } ${provider.textColor || 'text-white'} rounded-lg ${
                  provider.hoverColor
                } transition-colors disabled:opacity-50 w-full font-medium shadow-sm`}
              >
                {isLoading === provider.name ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  provider.icon
                )}
                {isLoading === provider.name ? 'Conectando...' : provider.text}
              </button>
            ))}
          </div>
        </>
      ) : (
        <button
          onClick={handleSignOut}
          className="w-full px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Cerrar sesión
        </button>
      )}
    </div>
  )
} 