'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ComposePost({ userAvatarUrl }: { userAvatarUrl: string }) {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('posts')
        .insert([{ content }])

      if (error) throw error
      
      setContent('')
      // Aquí podrías emitir un evento para actualizar la lista de posts
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 p-4 rounded-lg mb-4">
      <div className="flex gap-4">
        <img
          src={userAvatarUrl}
          alt="User avatar"
          className="w-12 h-12 rounded-full"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué está pasando?"
          className="flex-1 resize-none border-b border-gray-200 focus:outline-none focus:border-blue-500 p-2"
          rows={4}
          maxLength={280}
        />
      </div>
      <div className="flex justify-end mt-4">
        <span className="text-sm text-gray-500 mr-4">
          {content.length}/280
        </span>
        <button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold disabled:opacity-50 hover:bg-blue-600 transition-colors"
        >
          {isLoading ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </form>
  )
} 