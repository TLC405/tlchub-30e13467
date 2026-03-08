import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query, category } = await req.json()

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const searchQuery = category
      ? `${category} gym fitness Oklahoma City OKC`
      : `${query || 'gym fitness'} Oklahoma City OKC`

    console.log('Searching Firecrawl:', searchQuery)

    const response = await fetch('https://api.firecrawl.dev/v1/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: searchQuery,
        limit: 20,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Firecrawl error:', data)
      return new Response(
        JSON.stringify({ success: false, error: data.error || `Status ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse results into gym-like structures
    const gyms = (data.data || []).map((result: any, i: number) => ({
      id: `search-${i}`,
      name: result.title || 'Unknown',
      description: result.description || result.markdown?.slice(0, 200) || '',
      website: result.url || '',
      category: category || 'General',
      source_url: result.url,
    }))

    console.log(`Found ${gyms.length} results`)

    return new Response(
      JSON.stringify({ success: true, data: gyms }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
