import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

export async function syncUser() {
  const user = await currentUser()
  if (!user) return null

  // Use service role key to bypass RLS
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  // Check if user exists first to avoid unnecessary writes
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (existingUser) return existingUser

  // If not, insert
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      user_id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
    })
    .select()
    .single()

  if (error) {
    console.error('Error syncing user to Supabase:', error)
    // If table doesn't exist or other error, we log it.
    return null
  }

  return newUser
}
