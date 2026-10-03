import {NextRequest,NextResponse} from "next/server";
import {getWorkspaceContext} from "@/lib/workspace";

export async function GET(){
  const {sb,workspaceId,error}=await getWorkspaceContext();
  if(error||!sb||!workspaceId)return NextResponse.json({error:error||"Workspace não encontrado"},{status:error==="Não autenticado"?401:400});
  const {data,error:e}=await sb.from("templates").select("*").eq("workspace_id",workspaceId).order("created_at");
  return e?NextResponse.json({error:e.message},{status:400}):NextResponse.json({data});
}
export async function POST(req:NextRequest){
  const {sb,user,workspaceId,error}=await getWorkspaceContext();
  if(error||!sb||!user||!workspaceId)return NextResponse.json({error:error||"Workspace não encontrado"},{status:401});
  const b=await req.json();
  const row={workspace_id:workspaceId,name:String(b.name||"Novo template"),channel:b.channel==="whatsapp"?"whatsapp":"email",subject:b.channel==="whatsapp"?null:String(b.subject||""),body:String(b.body||""),active:b.active!==false,created_by:user.id,updated_at:new Date().toISOString()};
  const {data,error:e}=await sb.from("templates").insert(row).select().single();
  return e?NextResponse.json({error:e.message},{status:400}):NextResponse.json({data});
}
export async function PUT(req:NextRequest){
  const {sb,workspaceId,error}=await getWorkspaceContext();
  if(error||!sb||!workspaceId)return NextResponse.json({error:error||"Workspace não encontrado"},{status:401});
  const b=await req.json(); if(!b.id)return NextResponse.json({error:"id obrigatório"},{status:400});
  const patch={name:String(b.name||"Template"),channel:b.channel==="whatsapp"?"whatsapp":"email",subject:b.channel==="whatsapp"?null:String(b.subject||""),body:String(b.body||""),active:b.active!==false,updated_at:new Date().toISOString()};
  const {data,error:e}=await sb.from("templates").update(patch).eq("id",b.id).eq("workspace_id",workspaceId).select().single();
  return e?NextResponse.json({error:e.message},{status:400}):NextResponse.json({data});
}
