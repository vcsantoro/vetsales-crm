import { getSupabaseServer } from "@/lib/supabase-server";

export async function getWorkspaceContext(){
  const sb=await getSupabaseServer();
  if(!sb) return {sb:null,user:null,workspaceId:null,error:"Supabase não configurado"};
  const {data:{user},error:userError}=await sb.auth.getUser();
  if(userError||!user) return {sb,user:null,workspaceId:null,error:"Não autenticado"};
  const {data,error}=await sb.from("workspace_members").select("workspace_id").eq("user_id",user.id).limit(1);
  if(error) return {sb,user,workspaceId:null,error:error.message};
  return {sb,user,workspaceId:data?.[0]?.workspace_id||null,error:null};
}
