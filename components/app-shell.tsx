"use client";
import Link from "next/link";
import {LayoutDashboard,Users,Mail,MessageSquareText,Megaphone,Bot,Settings,Package,CalendarClock} from "lucide-react";
import {LogoutButton} from "@/components/logout-button";
const items=[
["/dashboard","Dashboard",LayoutDashboard],["/leads","Leads",Users],["/campaigns","Campanhas",Megaphone],["/templates","Templates",MessageSquareText],["/channels","Canais",Mail],["/settings","IA & Score",Bot],["/settings","Follow-ups",CalendarClock],["/settings","Produtos",Package],["/settings","Configurações",Settings]
] as const;
export function AppShell({children}:{children:React.ReactNode}){return <><div className="mobilebar"><b>🐾 VetSales</b><span>CRM</span></div><div className="shell"><aside className="sidebar"><div className="brand">🐾 <div>VetSales<small>Prospecção veterinária</small></div></div><nav className="nav">{items.map(([href,label,Icon],i)=><Link key={i} href={href}><Icon size={17}/>{label}</Link>)}</nav><div className="nav-logout"><LogoutButton/></div></aside><main className="main">{children}</main></div></>}
