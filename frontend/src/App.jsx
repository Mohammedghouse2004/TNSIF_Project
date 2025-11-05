import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", password: "" });
  const [editAdmin, setEditAdmin] = useState(null);
  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState("");

  const API_URL = "http://localhost:8080/admins";

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAdmins(data);
      setFilteredAdmins(data);
    } catch {
      toast.error("❌ Failed to load admins!");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Add admin
  const addAdmin = async () => {
    if (!newAdmin.name || !newAdmin.password) {
      toast.warning("⚠️ Please fill in all fields!");
      return;
    }
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });
      toast.success("✅ Admin added!");
      setNewAdmin({ name: "", password: "" });
      fetchAdmins();
    } catch {
      toast.error("❌ Failed to add admin!");
    }
  };

  // Update admin
  const updateAdmin = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editAdmin),
      });
      setEditAdmin(null);
      fetchAdmins();
      toast.info("📝 Admin updated!");
    } catch {
      toast.error("❌ Failed to update admin!");
    }
  };

  // Delete admin
  const deleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      toast.error("🗑️ Admin deleted!");
      fetchAdmins();
    } catch {
      toast.error("❌ Failed to delete admin!");
    }
  };

  // Filter admins by search
  useEffect(() => {
    const result = admins.filter((a) =>
      a.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredAdmins(result);
  }, [search, admins]);

  // Theme toggle
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={`app ${theme}`}>
      <ToastContainer position="top-center" autoClose={2000} theme={theme} />

      <header className="app-header">
        <h1>🌐 Admin Dashboard</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="🔍 Search admin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      <motion.div
        className="card add-card"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Add Admin</h2>
        <div className="form-row">
          <input
            type="text"
            placeholder="Admin Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={newAdmin.password}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, password: e.target.value })
            }
          />
          <button className="btn add-btn" onClick={addAdmin}>
            ➕ Add
          </button>
        </div>
      </motion.div>

      <motion.div
        className="card table-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Admin List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No admins found.
                </td>
              </tr>
            ) : (
              filteredAdmins.map((admin) => (
                <motion.tr
                  key={admin.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td>{admin.id}</td>
                  <td>
                    {editAdmin && editAdmin.id === admin.id ? (
                      <input
                        value={editAdmin.name}
                        onChange={(e) =>
                          setEditAdmin({ ...editAdmin, name: e.target.value })
                        }
                      />
                    ) : (
                      admin.name
                    )}
                  </td>
                  <td>
                    {editAdmin && editAdmin.id === admin.id ? (
                      <input
                        value={editAdmin.password}
                        onChange={(e) =>
                          setEditAdmin({
                            ...editAdmin,
                            password: e.target.value,
                          })
                        }
                      />
                    ) : (
                      admin.password
                    )}
                  </td>
                  <td>
                    {editAdmin && editAdmin.id === admin.id ? (
                      <button
                        className="btn save-btn"
                        onClick={() => updateAdmin(admin.id)}
                      >
                        💾 Save
                      </button>
                    ) : (
                      <button
                        className="btn edit-btn"
                        onClick={() => setEditAdmin(admin)}
                      >
                        ✏️ Edit
                      </button>
                    )}
                    <button
                      className="btn delete-btn"
                      onClick={() => deleteAdmin(admin.id)}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <footer className="footer">
        <p>© 2025 Admin Dashboard | React ⚛️ + Spring Boot 💻</p>
      </footer>
    </div>
  );
}

export default App;
