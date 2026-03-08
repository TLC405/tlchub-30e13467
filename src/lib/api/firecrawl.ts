import { supabase } from '@/integrations/supabase/client'

export interface GymSearchResult {
  id: string
  name: string
  description: string
  website: string
  category: string
  source_url: string
}

export const gymSearchApi = {
  async search(query: string, category?: string): Promise<{ success: boolean; data?: GymSearchResult[]; error?: string }> {
    const { data, error } = await supabase.functions.invoke('gym-search', {
      body: { query, category },
    })

    if (error) {
      return { success: false, error: error.message }
    }
    return data
  },
}
