import { useEffect, useState } from "react";
import api from "../../core/api";
import { Button } from "../../design-system/Button";

export function ParkingDashboard() {
  const [slots, setSlots] = useState<any[]>([]);
  const [plate, setPlate] = useState("");

  const load = () => api.get("/api/parking/slots").then((r) => setSlots(r.data));
  useEffect(() => { load(); }, []);

  const entry = async () => {
    await api.post("/api/parking/entry", { plate, vehicleType: "car" });
    setPlate("");
    load();
  };
  const exit = async (entryToken: string) => {
    const { data } = await api.post("/api/parking/exit", { entryToken });
    alert(`Total: $${data.amount} — Horas: ${data.hours}\nQR salida: ${data.qr}`);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex gap-3 mb-6">
        <input value={plate} onChange={(e) => setPlate(e.target.value)} placeholder="Placa" className="border rounded px-3 py-2" />
        <Button onClick={entry}>Registrar entrada</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {slots.map((s) => {
          const occ = s.records?.[0];
          return (
            <div key={s.id} className={`border rounded-lg p-3 ${occ ? "bg-rose-50 border-rose-300" : "bg-emerald-50 border-emerald-300"}`}>
              <div className="font-semibold">{s.code}</div>
              <div className="text-xs text-slate-500">{s.type}</div>
              {occ ? (
                <>
                  <div className="text-sm mt-1">{occ.plate}</div>
                  <Button variant="secondary" className="mt-2 w-full" onClick={() => exit(occ.entryToken)}>Salida</Button>
                </>
              ) : <div className="text-sm text-emerald-700 mt-1">Libre</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}