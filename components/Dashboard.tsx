import { useMemo, useState } from "react";

type PageKey = "overview" | "cnc" | "finance" | "agenda" | "returns";

type Kpi = {
  title: string;
  value: string;
  change: string;
};

const kpis: Kpi[] = [
  { title: "Aylık Satış", value: "₺553.750", change: "+12.4%" },
  { title: "Mal Maliyeti", value: "₺312.400", change: "+7.1%" },
  { title: "Reklam Maliyeti", value: "₺19.500", change: "+5.6%" },
  { title: "Net Kar", value: "₺97.840", change: "+8.9%" },
];

const channels = [
  { name: "Trendyol", revenue: "₺124.000", orders: 480, profit: "₺22.800" },
  { name: "Hepsiburada", revenue: "₺98.000", orders: 310, profit: "₺18.100" },
  { name: "N11", revenue: "₺61.500", orders: 190, profit: "₺9.200" },
  { name: "Site", revenue: "₺142.000", orders: 225, profit: "₺41.200" },
];

const dailyTasksSeed = [
  "Fatura kesimi",
  "Pazaryeri kontrolü",
  "CNC iş dağılımı",
  "Kaplama tedarikçi görüşmesi",
];

const navItems: { key: PageKey; label: string; desc: string }[] = [
  { key: "overview", label: "Genel Bakış", desc: "Satış ve operasyon özeti" },
  { key: "cnc", label: "Üretim & CNC", desc: "Aktif ve tamamlanan üretim işleri" },
  { key: "finance", label: "Muhasebe & Nakit", desc: "Gelen/giden ödeme takibi" },
  { key: "agenda", label: "Görevler & Ajanda", desc: "Günlük ve haftalık plan" },
  { key: "returns", label: "İade & Garanti", desc: "İade ve garanti süreçleri" },
];

const pageClass =
  "rounded-2xl border border-slate-700/70 bg-slate-900/60 p-5 shadow-[0_10px_30px_rgba(2,8,23,.35)]";

export default function Dashboard() {
  const [activePage, setActivePage] = useState<PageKey>("overview");
  const [tasks, setTasks] = useState(
    dailyTasksSeed.map((title, i) => ({ id: i + 1, title, done: i === 1 }))
  );

  const completionRate = useMemo(() => {
    const done = tasks.filter((task) => task.done).length;
    return Math.round((done / tasks.length) * 100);
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const activeMeta = navItems.find((item) => item.key === activePage)!;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 p-4 lg:grid-cols-[280px_1fr] lg:p-6">
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="mb-5 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 p-4 font-semibold">
            Sardıcı Panel v4
          </div>
          <nav className="space-y-2 text-sm">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActivePage(item.key)}
                className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                  activePage === item.key
                    ? "border-blue-300/40 bg-blue-500/15 text-blue-200"
                    : "border-transparent bg-slate-800/70 hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="space-y-5">
          <header className={pageClass}>
            <h1 className="text-2xl font-semibold">{activeMeta.label}</h1>
            <p className="mt-1 text-sm text-slate-400">{activeMeta.desc}</p>
          </header>

          {activePage === "overview" && (
            <section className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map((kpi) => (
                  <article key={kpi.title} className={pageClass}>
                    <p className="text-sm text-slate-400">{kpi.title}</p>
                    <p className="mt-2 text-3xl font-semibold">{kpi.value}</p>
                    <p className="mt-3 inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
                      {kpi.change}
                    </p>
                  </article>
                ))}
              </div>

              <article className={pageClass}>
                <h2 className="text-lg font-medium">Pazaryeri Performansı</h2>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[620px] text-sm">
                    <thead className="text-slate-400">
                      <tr className="border-b border-slate-800">
                        <th className="py-2 text-left">Kanal</th>
                        <th className="py-2 text-right">Ciro</th>
                        <th className="py-2 text-right">Sipariş</th>
                        <th className="py-2 text-right">Net Kar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {channels.map((channel) => (
                        <tr key={channel.name} className="border-b border-slate-900">
                          <td className="py-3">{channel.name}</td>
                          <td className="py-3 text-right">{channel.revenue}</td>
                          <td className="py-3 text-right">{channel.orders}</td>
                          <td className="py-3 text-right">{channel.profit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            </section>
          )}

          {activePage === "agenda" && (
            <section className={pageClass}>
              <h2 className="text-lg font-medium">Bugünün Görevleri</h2>
              <ul className="mt-4 space-y-2">
                {tasks.map((task) => (
                  <li key={task.id} className="flex items-center justify-between rounded-xl bg-slate-900 p-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span className={task.done ? "text-slate-500 line-through" : ""}>{task.title}</span>
                    </label>
                    <span className="text-xs text-slate-400">{task.done ? "Yapıldı" : "Bekliyor"}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-sm text-slate-300">
                Günlük tamamlama oranı: <strong>%{completionRate}</strong>
              </div>
            </section>
          )}

          {["cnc", "finance", "returns"].includes(activePage) && (
            <section className={pageClass}>
              <p className="text-slate-300">
                Bu bölüm iskeleti hazırlandı. Detay tablolar ve form akışları bir sonraki adımda
                eklenebilir.
              </p>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
