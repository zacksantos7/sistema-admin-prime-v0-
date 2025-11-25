"use client"

import type React from "react"
import type { Client } from "@/app/page"

interface DashboardStatsProps {
  clients: Client[]
  loading: boolean
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ clients, loading }) => {
  const totalClientes = clients.length
  const clientesAtivos = clients.filter((c) => c.status === "ativo").length
  const clientesPendentes = clients.filter((c) => c.status === "pendente").length

  // Preços dos planos
  const planoPrecos: Record<string, number> = {
    Básico: 59.9,
    "Familiar Plus": 69.9,
    Empresarial: 79.9,
    Intermediário: 69.9,
    Premium: 79.9,
  }

  const faturamentoMensal = clients
    .filter((c) => c.status === "ativo")
    .reduce((acc, c) => {
      const preco = planoPrecos[c.plano] || 0
      return acc + preco
    }, 0)

  const totalDependentes = clients.reduce((acc, c) => acc + (c.dependentes?.length || 0), 0)

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-content">
          <p className="stat-label">Total de Clientes</p>
          <p className="stat-value">{loading ? "..." : totalClientes}</p>
        </div>
      </div>

      <div className="stat-card stat-card--active">
        <div className="stat-icon">✓</div>
        <div className="stat-content">
          <p className="stat-label">Clientes Ativos</p>
          <p className="stat-value">{loading ? "..." : clientesAtivos}</p>
        </div>
      </div>

      <div className="stat-card stat-card--billing">
        <div className="stat-icon">💰</div>
        <div className="stat-content">
          <p className="stat-label">Faturamento Mensal</p>
          <p className="stat-value">
            R$ {loading ? "..." : faturamentoMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⏳</div>
        <div className="stat-content">
          <p className="stat-label">Pendentes de Ativação</p>
          <p className="stat-value">{loading ? "..." : clientesPendentes}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">👨‍👩‍👧</div>
        <div className="stat-content">
          <p className="stat-label">Total de Dependentes</p>
          <p className="stat-value">{loading ? "..." : totalDependentes}</p>
        </div>
      </div>

      <div className="stat-card stat-card--info">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <p className="stat-label">Ticket Médio</p>
          <p className="stat-value">
            R${" "}
            {loading
              ? "..."
              : (faturamentoMensal / Math.max(clientesAtivos, 1)).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  )
}
