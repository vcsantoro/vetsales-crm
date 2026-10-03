import raw from "@/data/leads.json";
import type {Lead,Template} from "./types";
export const leads:Lead[]=(raw as any[]).map((r,i)=>({...r,h24:r["24h"],score:r.prioridade==="A"?82+(i%15):r.prioridade==="B"?58+(i%18):35+(i%20)}));
export const templates:Template[]=[
{id:"tpl-1",name:"Primeiro contato — Clínica",channel:"email",subject:"Fornecimento veterinário para {{empresa}}",body:"Olá {{primeiro_nome}},\n\nMeu nome é {{vendedor}} e atuo com fornecimento de produtos veterinários na região de {{bairro}}.\n\nGostaria de identificar quem é responsável pelas compras e avaliação de novos fornecedores da {{empresa}}.\n\nObrigado,\n{{vendedor}}",active:true},
{id:"tpl-2",name:"Follow-up 3 dias",channel:"email",subject:"Retomando nosso contato — {{empresa}}",body:"Olá {{primeiro_nome}},\n\nRetomo meu contato para saber se você é a pessoa responsável por compras e fornecedores na {{empresa}} ou se poderia me indicar quem cuida dessa área.\n\nObrigado!",active:true},
{id:"tpl-3",name:"Qualificação — responsável de compras",channel:"whatsapp",body:"Olá {{primeiro_nome}}! Tudo bem? Gostaria de entender quem é responsável pela avaliação de fornecedores da {{empresa}}.",active:false}
];
