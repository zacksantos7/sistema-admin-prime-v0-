"use client"

import type React from "react"
import { useMemo, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useClients } from "@/hooks/use-clients"
import { DashboardStats } from "@/components/dashboard-stats"
import { ClientTable } from "@/components/client-table"
import { ClientCardUpdated } from "@/components/client-card-updated"
import { ClientForm } from "@/components/client-form"
import { logout } from "@/lib/auth"

export type ClientStatus = "ativo" | "pendente" | "cancelado"

export interface Client {
  id: string
  nome: string
  cpf: string
  telefone: string
  plano: string
  status: ClientStatus
  criadoEm: string
  dataNascimento?: string
  cep?: string
  endereco?: string
  cidade?: string
  estado?: string
  observacoes?: string
  dependentes?: Dependent[]
  titular_id?: string
}

export interface Dependent {
  id: string
  nome: string
  cpf?: string
  dataNascimento?: string
  relacao?: string
  cliente_id?: string
}

type View = "dashboard" | "lista" | "card"

const App: React.FC = () => {
  const router = useRouter()
  const { clients, loading, addClient, updateClient, deleteClient } = useClients()
  const [filtroStatus, setFiltroStatus] = useState<ClientStatus | "todos">("todos")
  const [busca, setBusca] = useState("")
  const [view, setView] = useState<View>("dashboard")
  const [cardClient, setCardClient] = useState<Client | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formMode, setFormMode] = useState<"create" | "add-dependent">("create")

  useEffect(() => {
    const token = sessionStorage.getItem("auth_token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    logout()
    sessionStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_user")
    router.push("/login")
  }

  const filtrados = useMemo(() => {
    return clients.filter((c) => {
      const matchesStatus = filtroStatus === "todos" || c.status === filtroStatus
      const buscaLower = busca.toLowerCase().trim()
      const matchesBusca =
        !buscaLower ||
        c.nome.toLowerCase().includes(buscaLower) ||
        c.cpf.replace(/\D/g, "").includes(buscaLower.replace(/\D/g, ""))
      return matchesStatus && matchesBusca
    })
  }, [clients, filtroStatus, busca])

  const handleCreate = (data: Omit<Client, "id" | "criadoEm"> | Dependent) => {
    if ("dependentes" in data) {
      updateClient(data.id, data)
    } else {
      addClient(data as Omit<Client, "id" | "criadoEm">)
    }
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    if (!window.confirm("Tem certeza que deseja remover este cliente?")) return
    deleteClient(id)
    if (cardClient?.id === id) {
      setView("lista")
      setCardClient(null)
    }
  }

  const openCard = (client: Client) => {
    setCardClient(client)
    setView("card")
  }

  const closeCard = () => {
    setView("lista")
    setCardClient(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Carregando clientes...</p>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-left">
          <img src="/logo.png" alt="Prime Life" className="header-logo" />
          <div className="header-text">
            <h1>Prime Life</h1>
            <p>Painel Administrativo</p>
          </div>
        </div>
        <div className="header-right">
          <button onClick={handleLogout} className="logout-btn">
            Sair
          </button>
        </div>
      </header>

      <div className="app-container">
        <aside className="sidebar-vertical">
          <nav className="sidebar-nav-vertical">
            <button
              className={`nav-btn ${view === "dashboard" ? "nav-btn--active" : ""}`}
              onClick={() => setView("dashboard")}
              title="Dashboard"
            >
              <span className="nav-icon">📊</span>
              <span className="nav-label">Dashboard</span>
            </button>
            <button
              className={`nav-btn ${view === "lista" ? "nav-btn--active" : ""}`}
              onClick={() => setView("lista")}
              title="Clientes"
            >
              <span className="nav-icon">👥</span>
              <span className="nav-label">Clientes</span>
            </button>
            <button className="nav-btn" disabled title="Assinaturas (em breve)">
              <span className="nav-icon">📋</span>
              <span className="nav-label">Assinaturas</span>
            </button>
            <button className="nav-btn" disabled title="Carteirinhas (em breve)">
              <span className="nav-icon">🎫</span>
              <span className="nav-label">Carteirinhas</span>
            </button>
          </nav>
        </aside>

        <main className="main-content">
          {view === "dashboard" && (
            <>
              <div className="content-header">
                <h2>Dashboard</h2>
                <p>Visão geral do sistema Prime Life</p>
              </div>
              <DashboardStats clients={clients} loading={loading} />
            </>
          )}

          {view === "lista" && (
            <>
              <div className="content-header">
                <div>
                  <h2>Clientes</h2>
                  <p>Gerencie todos os clientes do sistema</p>
                </div>
                <button
                  className="btn btn-novo-cliente"
                  onClick={() => {
                    setShowForm(true)
                    setFormMode("create")
                  }}
                >
                  + Novo Cliente
                </button>
              </div>

              <div className="filters-bar">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Buscar por nome, CPF ou e-mail..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="search-input"
                  />
                </div>
                <div className="filter-box">
                  <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value as any)}
                    className="filter-select"
                  >
                    <option value="todos">Todos os Status</option>
                    <option value="ativo">Ativos</option>
                    <option value="pendente">Pendentes</option>
                    <option value="cancelado">Cancelados</option>
                  </select>
                </div>
              </div>

              {showForm ? (
                <div className="card card--form">
                  <h3>{formMode === "create" ? "Novo Cliente" : "Adicionar Dependente"}</h3>
                  <ClientForm
                    mode={formMode}
                    allClients={formMode === "add-dependent" ? clients : undefined}
                    onCancel={() => setShowForm(false)}
                    onSubmit={handleCreate}
                  />
                </div>
              ) : (
                <ClientTable
                  clients={filtrados}
                  onEdit={(c) => {
                    setCardClient(c)
                    setView("card")
                  }}
                  onDelete={handleDelete}
                  onViewCard={openCard}
                />
              )}
            </>
          )}

          {view === "card" && cardClient && <ClientCardUpdated client={cardClient} onBack={closeCard} />}
        </main>
      </div>
    </div>
  )
}

export default App
