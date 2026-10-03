import {gunzipSync} from "node:zlib";
import {SEED_1} from "@/data/seed-1";
import {SEED_2} from "@/data/seed-2";
import {SEED_3} from "@/data/seed-3";
import {SEED_4} from "@/data/seed-4";

export function getSeedLeads():any[]{
  const packed=SEED_1+SEED_2+SEED_3+SEED_4;
  const json=gunzipSync(Buffer.from(packed,"base64")).toString("utf8");
  return JSON.parse(json);
}
