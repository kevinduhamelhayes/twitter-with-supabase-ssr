"use client";
import { createClient } from '@/app/utils/supabase/client'

import { redirect } from "next/navigation";
import ComposePost from "@/components/ComposePost";
import PostList from "@/components/PostList";
import NavBar from "@/components/NavBar";

export default async function DashboardPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <NavBar session={session} />
      <main className="max-w-2xl mx-auto p-4">
        <ComposePost userAvatarUrl={session.user.user_metadata.avatar_url} />
        <PostList />
      </main>
    </>
  );
} 