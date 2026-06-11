import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qdgfulifpdujhsrsfnpo.supabase.co'
const supabaseKey = 'sb_publishable_0vuGOf4K34aPaWaHw2E-Vg_H0QIcwgR'

export const supabase = createClient(supabaseUrl, supabaseKey)