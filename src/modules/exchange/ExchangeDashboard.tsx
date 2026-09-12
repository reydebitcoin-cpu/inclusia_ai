import { useEffect, useState } from "react";
import api from "../../core/api";
import { Button } from "../../design-system/Button";

export function ExchangeDashboard() {
  const [rates, setRates] = useState<any[]>([]);
  const [op, setOp] = useState({ type: "buy", fromCurrency: "USD", toCurrency: "COP", fromAmount: 100 });
  const [result, setResult] = useState<any>(null);

  const load = () => api.get("/api/exchange/rates").then((r) => setRates(r.data));
  useEffect(() => { load(); }, []);

  const operate = async () => {
    const { data } = await api.post("/api/exchange/operations", op);
    setResult(data);
    load();
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      <section className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Tasas</h2>
        <table className="w-full text-sm">
          <thead><tr className="text-left"><th>Moneda</th><th>Compra</th><th>Venta</th></tr></thead>
          <tbody>{rates.map((r) => <tr key={r.id} className="border-t"><td>{r.currencyId}</td><td>{r.buyRate}</td><td>{r.sellRate}</td></tr>)}</tbody>
        </table>
      </section>
      <section className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Operación</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <select value={op.type} onChange={(e) => setOp({ ...op, type: e.target.value })} className="border rounded p-2">
            <option value="buy">Comprar</option><option value="sell">Vender</option>
          </select>
          <input value={op.fromAmount} type="number" onChange={(e) => setOp({ ...op, fromAmount: +e.target.value })} className="border rounded p-2" />
        </div>
        <Button className="mt-3" onClick={operate}>Ejecutar</Button>
        {result && <div className="mt-3 text-sm">Recibiste: <b>{result.toAmount} {result.toCurrency}</b> — Recibo: {result.receipt}</div>}
      </section>
    </div>
  );
}