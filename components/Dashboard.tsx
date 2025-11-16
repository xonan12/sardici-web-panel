"use client";

import { useMemo, useState } from "react";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type ExpenseType = "İş" | "Ev";

type Expense = {
  date: string;
  amount: number;
  type: ExpenseType;
  description: string;
};

type NewExpense = Omit<Expense, "amount"> & { amount: string };

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "1 Haziran faturası kesildi mi?", done: false },
    { id: 2, text: "Ev masrafı girildi mi?", done: true },
    { id: 3, text: "İş masrafı girildi mi?", done: true },
    { id: 4, text: "Yeni personel başvuruları incelendi mi?", done: false },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { date: "2025-06-05", amount: 1200, type: "İş", description: "Günlük harcama" },
    { date: "2025-06-05", amount: 800, type: "Ev", description: "Market masrafı" },
  ]);

  const [newExpense, setNewExpense] = useState<NewExpense>({ date: "", amount: "", type: "İş", description: "" });
  const [expenseFilter, setExpenseFilter] = useState<"Hepsi" | ExpenseType>("Hepsi");

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleExpenseChange = <K extends keyof NewExpense>(field: K, value: NewExpense[K]) => {
    setNewExpense({ ...newExpense, [field]: value });
  };

  const addExpense = () => {
    const parsedAmount = Number(newExpense.amount);
    if (!newExpense.date || !parsedAmount || Number.isNaN(parsedAmount) || !newExpense.description) return;
    setExpenses([...expenses, { ...newExpense, amount: parsedAmount }]);
    setNewExpense({ date: "", amount: "", type: "İş", description: "" });
  };

  const filteredExpenses = useMemo(() => {
    if (expenseFilter === "Hepsi") return expenses;
    return expenses.filter((expense) => expense.type === expenseFilter);
  }, [expenses, expenseFilter]);

  const totalByType = useMemo(() => {
    return expenses.reduce(
      (acc, expense) => {
        acc[expense.type] += Number(expense.amount);
        return acc;
      },
      { İş: 0, Ev: 0 }
    );
  }, [expenses]);

  const totalExpenses = totalByType.İş + totalByType.Ev;
  const completedTasks = tasks.filter((task) => task.done).length;
  const taskCompletionRate = Math.round((completedTasks / tasks.length) * 100);
  const latestExpense = expenses[expenses.length - 1];

  return (
    <div className="grid gap-4 p-4">
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-2">📅 Bugün: 5 Haziran 2025</h2>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.done ? "line-through text-gray-400" : ""}>
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl shadow p-4">
          <p className="text-sm uppercase tracking-wide">Görev Tamamlanma</p>
          <p className="text-3xl font-bold mt-2">%{taskCompletionRate}</p>
          <p className="text-sm mt-1">
            {completedTasks} / {tasks.length} görev tamamlandı
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl shadow p-4">
          <p className="text-sm uppercase tracking-wide">Toplam Masraf</p>
          <p className="text-3xl font-bold mt-2">{totalExpenses.toLocaleString("tr-TR")} TL</p>
          <p className="text-sm mt-1 flex justify-between"><span>İş:</span> <span>{totalByType.İş.toLocaleString("tr-TR")} TL</span></p>
          <p className="text-sm flex justify-between"><span>Ev:</span> <span>{totalByType.Ev.toLocaleString("tr-TR")} TL</span></p>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl shadow p-4">
          <p className="text-sm uppercase tracking-wide">Son Masraf</p>
          {latestExpense ? (
            <>
              <p className="text-2xl font-semibold mt-2">{latestExpense.amount.toLocaleString("tr-TR")} TL</p>
              <p className="text-sm mt-1">{latestExpense.type} • {latestExpense.description}</p>
              <p className="text-xs text-white/80">{new Date(latestExpense.date).toLocaleDateString("tr-TR")}</p>
            </>
          ) : (
            <p className="text-sm mt-2">Henüz kayıt yok</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold mb-2">📊 Günlük Özet</h2>
        <ul className="space-y-1">
          <li>💼 İş masrafı: <strong>1.200 TL</strong></li>
          <li>🏠 Ev masrafı: <strong>800 TL</strong></li>
          <li>🧾 Fatura durumu: <strong>Bekliyor</strong></li>
          <li>👤 Bugünkü başvuru: <strong>1 erkek (Emrullah)</strong></li>
          <li>📋 Toplam başvuru: <strong>53 kişi</strong></li>
          <li>📦 Kargo durumu: <strong>Tertemiz</strong></li>
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <h2 className="text-xl font-bold mb-2">🧾 Muhasebe Kaydı Ekle</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) => handleExpenseChange("date", e.target.value)}
            className="border rounded p-2"
          />
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => handleExpenseChange("amount", e.target.value)}
            className="border rounded p-2"
            placeholder="Tutar"
          />
          <select
            value={newExpense.type}
            onChange={(e) => handleExpenseChange("type", e.target.value as ExpenseType)}
            className="border rounded p-2"
          >
            <option value="İş">İş</option>
            <option value="Ev">Ev</option>
          </select>
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => handleExpenseChange("description", e.target.value)}
            className="border rounded p-2"
            placeholder="Açıklama"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {["Hepsi", "İş", "Ev"].map((filter) => (
            <button
              key={filter}
              onClick={() => setExpenseFilter(filter as "Hepsi" | ExpenseType)}
              className={`rounded-full px-3 py-1 text-sm border ${
                expenseFilter === filter
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <ul className="pt-4 space-y-1">
          {filteredExpenses.map((exp, idx) => (
            <li key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-2 last:border-b-0">
              <div className="font-medium">{new Date(exp.date).toLocaleDateString("tr-TR")}</div>
              <div className="text-sm text-gray-500">{exp.type}</div>
              <div className="text-sm text-gray-700">{exp.description}</div>
              <div className="font-semibold">{exp.amount.toLocaleString("tr-TR")} TL</div>
            </li>
          ))}
          {filteredExpenses.length === 0 && (
            <li className="text-sm text-gray-500">Seçilen filtreye ait kayıt bulunamadı.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
