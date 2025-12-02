import { db } from "./config/database";

async function testConnection() {
  try {
    const conn = await db.getConnection();
    console.log("✅ Conectado ao MySQL da Hostinger!");
    conn.release();
  } catch (error) {
    console.error("❌ Erro ao conectar:", error);
  }
}

testConnection();
