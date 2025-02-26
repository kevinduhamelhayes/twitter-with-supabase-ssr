'use client'

import { Session } from '@supabase/supabase-js'
import Link from 'next/link'

export default function NavBar({ session }: { session: Session | null }) {
  return (
    <nav className="border-b border-gray-200 py-4 mb-8">
      <div className="max-w-2xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-600">
          MiduTwitter
        </Link>

        <div className="flex items-center gap-4">
          {session && (
            <div className="flex items-center gap-2">
              <img
                src={session.user.user_metadata.avatar_url}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700">
                {session.user.user_metadata.user_name}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
} 