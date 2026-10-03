"use client";
import {LogOut} from "lucide-react";
import {getSupabaseBrowser} from "@/lib/supabase-browser";
export function LogoutButton(){async function logout(){const sb=getSupabaseBrowser();if(sb)await sb.auth.signOut();window.location.href="/login"}return <button className="nav-button" onClick={logout}><LogOut size={17}/>Sair</button>}
