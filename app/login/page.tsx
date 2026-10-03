"use client";

import { FormEvent, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase-browser";

export default function Login(){
  const [mode,setMode]=useState<"login"|"signup">("login");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState<string | null>(null);
  const [error,setError]=useState<string | null>(null);

  async function submit(e:FormEvent){
    e.preventDefault();setLoading(true);setError(null);setMessage(null);
    const sb=getSupabaseBrowser();
    if(!sb){setError("Supabase ainda não está configurado.");setLoading(false);return;}
    if(mode==="signup"){
      const {data,error}=await sb.auth.signUp({email,password,options:{data:{full_name:name||email.split("@")[0]}}});
      if(error){setError(error.message);} else if(data.session){window.location.href="/dashboard";} else {setMessage("Conta criada. Verifique seu e-mail para confirmar o acesso e depois entre no VetSales.");setMode("login");}
    } else {
      const {error}=await sb.auth.signInWithPassword({email,password});
      if(error){setError(error.message);} else {window.location.href="/dashboard";}
    }
    setLoading(false);
  }

  return <div className="login"><div className="login-card"><h1>🐾 VetSales</h1><p className="muted">CRM de prospecção veterinária</p><form className="stack" style={{marginTop:22}} onSubmit={submit}>
    {mode==="signup"&&<div className="field"><label>Nome</label><input className="input" style={{width:"100%"}} value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome"/></div>}
    <div className="field"><label>E-mail</label><input className="input" style={{width:"100%"}} type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com"/></div>
    <div className="field"><label>Senha</label><input className="input" style={{width:"100%"}} type="password" required minLength={8} value={password} onChange={e=>setPassword(e.target.value)} placeholder="mínimo 8 caracteres"/></div>
    {error&&<div className="notice">{error}</div>}{message&&<div className="notice success">{message}</div>}
    <button className="btn" disabled={loading}>{loading?"Aguarde...":mode==="login"?"Entrar":"Criar conta"}</button>
    <button type="button" className="btn secondary" onClick={()=>{setMode(mode==="login"?"signup":"login");setError(null);setMessage(null)}}>{mode==="login"?"Criar minha conta":"Já tenho conta"}</button>
  </form></div></div>
}
