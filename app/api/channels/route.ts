import {NextRequest,NextResponse} from "next/server";
import {getWorkspaceContext} from "@/lib/workspace";

export async function GET(){
  const {sb,workspaceId,error}=await getWorkspaceContext();
  if(error||!sb||!workspaceId)return NextResponse.json({error:error||"Workspace não encontrado"},{status:401});
  const {data,error:e}=await sb.from("channels").select("id,channel_type,provider,name,sender_name,sender_address,daily_limit,min_interval_minutes,enabled,settings,secret_ref,updated_at").eq("workspace_id",workspaceId).order("channel_type");
  return e?NextResponse.json({error:e.message},{status:400}):NextResponse.json({data});
}
export async function POST(req:NextRequest){
  const {sb,workspaceId,error}=await getWorkspaceContext();
  if(error||!sb||!workspaceId)return NextResponse.json({error:error||"Workspace não encontrado"},{status:401});
  const b=await req.json();
  const row={workspace_id:workspaceId,channel_type:b.channel_type==="whatsapp"?"whatsapp":"email",provider:String(b.provider||"resend").toLowerCase(),name:String(b.name||"Canal"),sender_name:b.sender_name||null,sender_address:b.sender_address||null,daily_limit:Number(b.daily_limit||15),min_interval_minutes:Number(b.min_interval_minutes||10),enabled:Boolean(b.enabled),settings:b.settings||{},secret_ref:b.secret_ref||null,updated_at:new Date().toISOString()};
  const {data,error:e}=await sb.from("channels").insert(row).select().single();
  return e?NextResponse.json({error:e.message},{status:400}):NextResponse.json({data});
}
export async function PUT(req:NextRequest){
  const {sb,workspaceId,error}=await getWorkspaceContext();
  if(error||!sb||!workspaceId)return NextResponse.json({error:error||"Workspace não encontrado"},{status:401});
  const b=await req.json(); if(!b.id)return NextResponse.json({error:"id obrigatório"},{status:400});
  const patch={provider:String(b.provider||"resend").toLowerCase(),name:String(b.name||"Canal"),sender_name:b.sender_name||null,sender_address:b.sender_address||null,daily_limit:Number(b.daily_limit||15),min_interval_minutes:Number(b.min_interval_minutes||10),enabled:Boolean(b.enabled),settings:b.settings||{},secret_ref:b.secret_ref||null,updated_at:new Date().toISOString()};
  const {data,error:e}=await sb.from("channels").update(patch).eq("id",b.id).eq("workspace_id",workspaceId).select().single();
  return e?NextResponse.json({error:e.message},{status:400}):NextResponse.json({data});
}
