import { useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "1 Haziran faturası kesildi mi?", done: false },
    { id: 2, text: "Ev masrafı girildi mi?", done: true },
    { id: 3, text: "İş masrafı girildi mi?", done: true },
    { id: 4, text: "Yeni personel başvuruları incelendi mi?", done: false },
  ]);

  const [expenses, setExpenses] = useState([
    { date: "2025-06-05", amount: 1200, type: "İş", description: "Günlük harcama" },
    { date: "2025-06-05", amount: 800, type: "Ev", description: "Market masrafı" },
  ]);

  const [newExpense, setNewExpense] = useState({ date: "", amount: "", type: "İş", description: "" });

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const handleExpenseChange = (field, value) => {
    setNewExpense({ ...newExpense, [field]: value });
  };

  const addExpense = () => {
    if (!newExpense.date || !newExpense.amount || !newExpense.description) return;
    setExpenses([...expenses, newExpense]);
    setNewExpense({ date: "", amount: "", type: "İş", description: "" });
  };

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
            onChange={(e) => handleExpenseChange("type", e.target.value)}
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
        <button onClick={addExpense} className="mt-2 bg-blue-500 text-white rounded px-4 py-2">Ekle</button>
        <ul className="pt-4 space-y-1">
          {expenses.map((exp, idx) => (
            <li key={idx}>
              📌 {exp.date} | {exp.amount} TL | {exp.type} – {exp.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
