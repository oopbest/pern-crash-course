import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const sql = neon(
  `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

// postgresql://neondb_owner:npg_s0yjYO2ftiVM@ep-polished-moon-a851cfn0-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
