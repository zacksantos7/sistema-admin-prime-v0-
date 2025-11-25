"use client"

import type React from "react"
import type { Client } from "@/app/page"

interface Props {
  clients: Client[]
  onEdit: (client: Client) => void
  onDelete: (id: string) => void
  onViewCard: (client: Client) => void
}

const formatDate = (iso: string | undefined) => {
  if (!iso) return "-"
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
}

export const ClientTable: React.FC<Props> = ({ clients, onEdit, onDelete, onViewCard }) => {
  if (!clients.length) {
    return (
      <div className="card card--empty">
        <h3>Nenhum cliente encontrado</h3>
        <p>Use o formulário ao lado para cadastrar o primeiro cliente.</p>
      </div>
    )
  }

  return (
    <div className="card card--table">
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Plano</th>
            <th>Status</th>
            <th>Telefone</th>
            <th>Data Nasc.</th>
            <th>Dependentes</th>
            <th>Criado em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>
                <div className="table-main-cell">
                  <strong>{client.nome}</strong>
                  <small>CPF: {client.cpf}</small>
                </div>
              </td>
              <td>{client.plano || "-"}</td>
              <td>
                <span className={`badge badge--${client.status}`}>
                  {client.status === "ativo" ? "Ativo" : client.status === "pendente" ? "Pendente" : "Cancelado"}
                </span>
              </td>
              <td>{client.telefone || "-"}</td>
              <td>{formatDate(client.dataNascimento)}</td>
              <td className="text-center">
                <span className="badge badge--secondary">{client.dependentes?.length || 0}</span>
              </td>
              <td>{formatDate(client.criadoEm)}</td>
              <td>
                <div className="table-actions">
                  <button className="btn btn--tiny" onClick={() => onViewCard(client)}>
                    Carteirinha
                  </button>
                  <button className="btn btn--tiny btn--ghost" onClick={() => onEdit(client)}>
                    Editar
                  </button>
                  <button className="btn btn--tiny btn--danger" onClick={() => onDelete(client.id)}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
