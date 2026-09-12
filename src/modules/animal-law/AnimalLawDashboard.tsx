import { useEffect, useState } from "react";
import api from "../../core/api";
import { Button } from "../../design-system/Button";

export function AnimalLawDashboard() {
  const [cases, setCases] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const load = () => api.get("/api/animal-law/cases").then((r) => setCases(r.data));
  useEffect(() => { load(); }, []);

  const create = async () => {
    await api.post("/api/animal-law/cases", { title });
    setTitle("");
    load();
  };

  return (
    <div className="p-6">
      <div className="flex gap-3 mb-6">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título del caso" className="border rounded px-3 py-2 flex-1" />
        <Button onClick={create}>Nuevo caso</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {cases.map((c) => (
          <div key={c.id} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div className="font-semibold">{c.title}</div>
              <span className="text-xs bg-slate-100 px-2 py-1 rounded">{c.code}</span>
            </div>
            <div className="text-sm text-slate-500 mt-1">Estado: {c.status}</div>
            <div className="text-sm mt-2">{c.documents?.length ?? 0} documentos</div>
          </div>
        ))}
      </div>
    </div>
  );
}