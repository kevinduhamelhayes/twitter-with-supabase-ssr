'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import TimeAgo from 'react-timeago'
import spanishStrings from 'react-timeago/lib/language-strings/es'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(spanishStrings)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Post = {
  id: string
  content: string
  created_at: string
  user_id: string
  profiles: {
    username: string
    avatar_url: string
    name: string
  }
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            username,
            avatar_url,
            name
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching posts:', error)
        return
      }

      setPosts(data)
    }

    fetchPosts()

    // Suscribirse a nuevos posts
    const channel = supabase
      .channel('posts')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'posts'
      }, () => {
        fetchPosts()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {posts.map(post => (
        <article key={post.id} className="border border-gray-200 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={post.profiles.avatar_url}
              alt={`${post.profiles.name}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-bold">{post.profiles.name}</h2>
              <span className="text-gray-500">@{post.profiles.username}</span>
            </div>
          </div>
          
          <p className="text-gray-800 mb-2">{post.content}</p>
          
          <footer className="text-gray-500 text-sm">
            <TimeAgo date={post.created_at} formatter={formatter} />
          </footer>
        </article>
      ))}
    </div>
  )
} 