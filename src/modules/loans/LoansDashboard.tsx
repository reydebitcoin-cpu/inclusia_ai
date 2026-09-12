import { useEffect, useState } from "react";
import api from "../../core/api";
import { Button } from "../../design-system/Button";

export function LoansDashboard() {
  const [sim, setSim] = useState<any>(null);
  const [form, setForm] = useState({ amount: 1000, rate: 2, term: 12 });

  const simulate = async () => {
    const { data } = await api.post("/api/loans/simulate", form);
    setSim(data);
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <section className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Simulador</h2>
        <label className="block text-sm">Monto
          <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: +e.target.value })} className="w-full border rounded px-2 py-1 mt-1" />
        </label>
        <label className="block text-sm mt-2">Tasa mensual %
          <input type="number" step="0.1" value={form.rate} onChange={(e) => setForm({ ...form, rate: +e.target.value })} className="w-full border rounded px-2 py-1 mt-1" />
        </label>
        <label className="block text-sm mt-2">Meses
          <input type="number" value={form.term} onChange={(e) => setForm({ ...form, term: +e.target.value })} className="w-full border rounded px-2 py-1 mt-1" />
        </label>
        <Button className="mt-4" onClick={simulate}>Calcular</Button>
        {sim && (
          <div className="mt-4 text-sm">
            <div>Cuota: <b>${sim.payment}</b></div>
            <div>Total: <b>${sim.total}</b></div>
            <div>Intereses: <b>${sim.interest}</b></div>
          </div>
        )}
      </section>
      <section className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Créditos vencidos</h2>
        <OverdueList />
      </section>
    </div>
  );
}

function OverdueList() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => { api.get("/api/loans/overdue").then((r) => setRows(r.data.items)); }, []);
  return (
    <table className="w-full text-sm">
      <thead><tr className="text-left"><th>Cliente</th><th>Cuota</th><th>Vence</th><th>Saldo</th></tr></thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id} className="border-t">
            <td>{r.loan.client.name}</td>
            <td>#{r.number}</td>
            <td>{new Date(r.dueDate).toLocaleDateString()}</td>
            <td>${(Number(r.amount) - Number(r.paid)).toFixed(2)}</td>
          </tr>
        ))}
        {rows.length === 0 && <tr><td colSpan={4} className="text-slate-500 py-3">Sin mora 🎉</td></tr>}
      </tbody>
    </table>
  );
}