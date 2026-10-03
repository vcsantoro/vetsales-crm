import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase-server";
import raw from "@/data/leads.json";

export async function POST(){
  const sb=await getSupabaseServer();
  if(!sb) return NextResponse.json({error:"Supabase não configurado"},{status:503});
  const {data:{user}}=await sb.auth.getUser();
  if(!user) return NextResponse.json({error:"Não autenticado"},{status:401});
  const {data:memberships,error:memberError}=await sb.from("workspace_members").select("workspace_id").eq("user_id",user.id).limit(1);
  if(memberError) return NextResponse.json({error:memberError.message},{status:400});
  const workspaceId=memberships?.[0]?.workspace_id;
  if(!workspaceId) return NextResponse.json({error:"Workspace não encontrado"},{status:400});
  const rows=(raw as any[]).map(r=>({workspace_id:workspaceId,external_id:r.id,priority:r.prioridade,zone:r.zona,neighborhood:r.bairro,segment:r.segmento,network:r.rede_grupo,name:r.nome,address:r.endereco,phone:r.telefone,whatsapp:r.whatsapp,email:r.email,website:r.site,instagram:r.instagram,facebook:r.facebook,linkedin:r.linkedin,rating:r.avaliacao,rating_count:r.no_avaliacoes,is_24h:r["24h"]==="Sim",product_fit:r.fit_produtos,target_role:r.cargo_alvo_sugerido,public_decision_maker:r.decisor_referencia_publica,commercial_notes:r.observacoes_comerciais,source_maps:r.fonte_maps,source_official:r.fonte_oficial,collected_at:r.data_coleta,status:"nao_contatado"}));
  for(let i=0;i<rows.length;i+=50){
    const {error}=await sb.from("leads").upsert(rows.slice(i,i+50),{onConflict:"workspace_id,external_id"});
    if(error) return NextResponse.json({error:error.message},{status:400});
  }
  return NextResponse.json({ok:true,imported:rows.length});
}
