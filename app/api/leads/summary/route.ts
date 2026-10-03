import {NextRequest,NextResponse} from "next/server";
import {getWorkspaceContext} from "@/lib/workspace";
export async function GET(req:NextRequest){
  const {sb,workspaceId,error}=await getWorkspaceContext();
  if(error||!sb||!workspaceId)return NextResponse.json({error:error||"Workspace não encontrado"},{status:401});
  const zone=req.nextUrl.searchParams.get("zone");const priority=req.nextUrl.searchParams.get("priority");
  let q=sb.from("leads").select("id",{count:"exact",head:true}).eq("workspace_id",workspaceId);
  if(zone)q=q.ilike("zone",`%${zone}%`);if(priority)q=q.eq("priority",priority);
  const {count,error:e}=await q;return e?NextResponse.json({error:e.message},{status:400}):NextResponse.json({count:count||0});
}
