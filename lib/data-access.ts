import { redirect } from "next/navigation";
import { leads as mockLeads } from "./mock";
import type { Lead } from "./types";
import { getSupabaseServer } from "./supabase-server";

function dbToLead(r:any):Lead{return {
  id:r.external_id || r.id, prioridade:r.priority||"B", zona:r.zone||"", bairro:r.neighborhood||"", segmento:r.segment||"", rede_grupo:r.network,
  nome:r.name, endereco:r.address, telefone:r.phone, whatsapp:r.whatsapp, email:r.email, site:r.website, instagram:r.instagram, facebook:r.facebook,
  linkedin:r.linkedin, avaliacao:r.rating, no_avaliacoes:r.rating_count, h24:r.is_24h?"Sim":"Não", fit_produtos:r.product_fit, cargo_alvo_sugerido:r.target_role,
  decisor_referencia_publica:r.public_decision_maker, observacoes_comerciais:r.commercial_notes, fonte_maps:r.source_maps, fonte_oficial:r.source_official,
  data_coleta:r.collected_at, status:r.status, ultimo_contato:r.last_contact_at, proximo_follow_up:r.next_follow_up_at, notas:r.notes, score:r.score
}}

export async function getLeads():Promise<Lead[]> {
  const configured=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const sb=await getSupabaseServer();
  if(!configured||!sb) return mockLeads;
  const {data:{user}}=await sb.auth.getUser();
  if(!user) redirect("/login");
  const {data:memberships,error:membershipError}=await sb.from("workspace_members").select("workspace_id").eq("user_id",user.id).limit(1);
  if(membershipError) throw new Error(membershipError.message);
  const workspaceId=memberships?.[0]?.workspace_id;
  if(!workspaceId) return [];
  const {data,error}=await sb.from("leads").select("*").eq("workspace_id",workspaceId).order("priority").order("name");
  if(error) throw new Error(error.message);
  return (data||[]).map(dbToLead);
}

export async function getLead(id:string){const all=await getLeads();return all.find(x=>x.id===id) || null;}
