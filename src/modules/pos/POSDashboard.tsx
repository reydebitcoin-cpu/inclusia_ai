import { useEffect, useState } from "react";
import api from "../../core/api";
import { Button } from "../../design-system/Button";

export function POSDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<{ productId: string; qty: number; name: string; price: number }[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    api.get("/api/pos/products").then((r) => setProducts(r.data.items));
    api.get("/api/pos/reports/summary").then((r) => setSummary(r.data));
  }, []);

  const add = (p: any) => {
    setCart((c) => {
      const ex = c.find((i) => i.productId === p.id);
      if (ex) return c.map((i) => (i.productId === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { productId: p.id, qty: 1, name: p.name, price: Number(p.price) }];
    });
  };

  const checkout = async () => {
    const items = cart.map((i) => ({ productId: i.productId, qty: i.qty }));
    await api.post("/api/pos/sales", { items, payment: "cash" });
    setCart([]);
    api.get("/api/pos/reports/summary").then((r) => setSummary(r.data));
  };

  const total = cart.reduce((a, b) => a + b.qty * b.price, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <section className="md:col-span-2">
        <h2 className="text-xl font-semibold mb-3">Productos</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {products.map((p) => (
            <button key={p.id} onClick={() => add(p)} className="border rounded-lg p-3 text-left hover:border-indigo-500">
              <div className="font-medium">{p.name}</div>
              <div className="text-slate-500 text-sm">Stock: {p.stock}</div>
              <div className="text-indigo-600 font-semibold">${Number(p.price).toFixed(2)}</div>
            </button>
          ))}
        </div>
      </section>
      <aside className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Venta</h2>
        <ul className="divide-y">
          {cart.map((i) => (
            <li key={i.productId} className="py-2 flex justify-between">
              <span>{i.name} × {i.qty}</span>
              <span>${(i.qty * i.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between font-bold"><span>Total</span><span>${total.toFixed(2)}</span></div>
        <Button className="w-full mt-4" onClick={checkout} disabled={cart.length === 0}>Cobrar</Button>
        {summary && (
          <div className="mt-6 text-sm text-slate-600">
            Hoy: <b>{summary.today.count}</b> ventas · <b>${Number(summary.today.total).toFixed(2)}</b>
          </div>
        )}
      </aside>
    </div>
  );
}