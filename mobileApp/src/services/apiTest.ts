import axios from "axios";

//MI IP LOCAL
const API_BASE = "http://192.168.31.1:3000"; 
// 👆 reemplaza TU_IP_LOCAL por tu IP real de la máquina, no uses localhost si corres en emulador Android

export async function testFirebase() {
  try {
    const res = await axios.get(`${API_BASE}/test-firebase-simple`);
    console.log("Respuesta del backend:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("Error al conectar con backend:", error.message);
    return null;
  }
}
