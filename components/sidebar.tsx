"use client"

import type React from "react"
import type { ClientStatus, Client } from "@/app/page"
import { useState } from "react"
import { ClientForm } from "./client-form"

interface SidebarProps {
  view: "dashboard" | "lista" | "card"
  filtroStatus: ClientStatus | "todos"
  busca: string
  onViewChange: (view: "dashboard" | "lista" | "card") => void
  onFiltroChange: (status: ClientStatus | "todos") => void
  onBuscaChange: (busca: string) => void
  onAddClient: (data: any) => void
  clients?: Client[]
}

export const Sidebar: React.FC<SidebarProps> = ({
  view,
  filtroStatus,
  busca,
  onViewChange,
  onFiltroChange,
  onBuscaChange,
  onAddClient,
  clients = [],
}) => {
  const [showForm, setShowForm] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "add-dependent">("create")

  return (
    <aside className="sidebar">
      {/* Logo Section - Compact */}
      <div className="sidebar-header">
        <img src="/logo.png" alt="Prime Life Logo" className="sidebar-logo" />
        <h1 className="sidebar-title">Prime Life</h1>
      </div>

      {/* Navigation - Primary CTA */}
      <section className="sidebar-nav">
        <button
          className={"nav-item " + (view === "dashboard" ? "nav-item--active" : "")}
          onClick={() => onViewChange("dashboard")}
        >
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </button>
        <button
          className={"nav-item " + (view === "lista" ? "nav-item--active" : "")}
          onClick={() => onViewChange("lista")}
        >
          <span className="nav-icon">👥</span>
          <span>Clientes</span>
        </button>
      </section>

      {/* Divider */}
      <div className="sidebar-divider" />

      {/* Filters - Only on Clientes view */}
      {view === "lista" && (
        <>
          <section className="sidebar-filters">
            <label className="filter-label">Status</label>
            <div className="filter-chips">
              {(["todos", "ativo", "pendente", "cancelado"] as const).map((status) => (
                <button
                  key={status}
                  className={"filter-chip " + (filtroStatus === status ? "filter-chip--active" : "")}
                  onClick={() => onFiltroChange(status)}
                  title={`Filtrar por ${status}`}
                >
                  {status === "todos"
                    ? "Todos"
                    : status === "ativo"
                      ? "✓ Ativos"
                      : status === "pendente"
                        ? "⏳ Pendentes"
                        : "✕ Cancelados"}
                </button>
              ))}
            </div>
          </section>

          <section className="sidebar-search">
            <input
              type="text"
              placeholder="Buscar nome ou CPF..."
              value={busca}
              onChange={(e) => onBuscaChange(e.target.value)}
              className="search-input"
            />
          </section>

          <div className="sidebar-divider" />
        </>
      )}

      {/* Add Client CTA - now shows both create and add dependent modes */}
      <section className="sidebar-cta">
        {!showForm && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              className="btn btn--primary btn--block"
              onClick={() => {
                setShowForm(true)
                setFormMode("create")
              }}
            >
              + Novo Cliente
            </button>

            {view === "lista" && clients.length > 0 && (
              <button
                className="btn btn--block"
                style={{
                  background: "#e91e8c",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#d41a78")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#e91e8c")}
                onClick={() => {
                  setShowForm(true)
                  setFormMode("add-dependent")
                }}
              >
                👤 Adicionar Dependente
              </button>
            )}
          </div>
        )}

        {/* Form - Collapsible */}
        {showForm && (
          <div className="sidebar-form-wrapper">
            <ClientForm
              mode={formMode}
              allClients={formMode === "add-dependent" ? clients : undefined}
              onCancel={() => setShowForm(false)}
              onSubmit={(data) => {
                onAddClient(data)
                setShowForm(false)
              }}
            />
          </div>
        )}
      </section>

      {/* Footer - Auto positioned */}
      <div className="sidebar-spacer" />
      <footer className="sidebar-footer">
        <p>✓ Sincronizado com Supabase</p>
      </footer>
    </aside>
  )
}
