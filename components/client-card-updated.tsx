"use client"

import type React from "react"
import { useRef } from "react"
import type { Client } from "@/app/page"
import { generateCardPDF } from "@/utils/pdf-generator"

interface Props {
  client: Client
  onBack: () => void
}

const formatDateLong = (iso: string | undefined) => {
  if (!iso) return "Não informado"
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export const ClientCardUpdated: React.FC<Props> = ({ client, onBack }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    if (cardRef.current) {
      await generateCardPDF(cardRef.current, client.nome)
    }
  }

  return (
    <div className="card card--cardview">
      <div className="card-header-actions">
        <button className="btn btn--ghost" onClick={onBack}>
          ← Voltar para a lista
        </button>
        <button className="btn btn--primary" onClick={handleDownloadPDF}>
          📥 Baixar Carteirinha
        </button>
      </div>

      <div className="card-layout">
        <section className="card-visual">
          <div className="virtual-card virtual-card--prime" ref={cardRef}>
            <div className="virtual-card__header">
              <img src="/logo.png" alt="Prime Life" className="virtual-card__logo" />
              <span className="virtual-card__status">
                {client.status === "ativo" ? "ATIVO" : client.status === "pendente" ? "PENDENTE" : "CANCELADO"}
              </span>
            </div>
            <div className="virtual-card__body">
              <p className="virtual-card__label">Nome</p>
              <p className="virtual-card__value">{client.nome}</p>

              <p className="virtual-card__label">CPF</p>
              <p className="virtual-card__value">{client.cpf}</p>

              <p className="virtual-card__label">Plano</p>
              <p className="virtual-card__value">{client.plano || "Plano não informado"}</p>

              <p className="virtual-card__label">Desde</p>
              <p className="virtual-card__value">{formatDateLong(client.criadoEm)}</p>
            </div>

            <div className="virtual-card__footer">
              <div className="qr-placeholder">
                <span>QR Code</span>
                <small>(futuro link)</small>
              </div>
              <div className="virtual-card__brand">
                <img src="/logo.png" alt="Prime Life" className="card-logo-small" />
                <strong>Prime Life</strong>
                <small>Carteirinha digital</small>
              </div>
            </div>
          </div>
        </section>

        <section className="card-info">
          <h2>Detalhes do cliente</h2>
          <ul className="info-list">
            <li>
              <span>Data de Nascimento</span>
              <strong>{formatDateLong(client.dataNascimento)}</strong>
            </li>
            <li>
              <span>CEP / Endereço</span>
              <strong>
                {client.cep} - {client.endereco || "Não informado"}
              </strong>
            </li>
            <li>
              <span>Cidade / Estado</span>
              <strong>
                {client.cidade || "-"} / {client.estado || "-"}
              </strong>
            </li>
            <li>
              <span>Telefone / WhatsApp</span>
              <strong>{client.telefone || "Não informado"}</strong>
            </li>
            <li>
              <span>Status atual</span>
              <strong>
                {client.status === "ativo"
                  ? "Ativo (pagamento em dia)"
                  : client.status === "pendente"
                    ? "Pendente (verificar cobrança)"
                    : "Cancelado"}
              </strong>
            </li>
          </ul>

          {client.dependentes && client.dependentes.length > 0 && (
            <div className="dependents-section">
              <h3>Dependentes ({client.dependentes.length})</h3>
              <ul className="dependents-list">
                {client.dependentes.map((dep) => (
                  <li key={dep.id} className="dependent-item">
                    <strong>{dep.nome}</strong>
                    {dep.relacao && <small>Relação: {dep.relacao}</small>}
                    {dep.dataNascimento && <small>Data Nasc.: {formatDateLong(dep.dataNascimento)}</small>}
                    {dep.cpf && <small>CPF: {dep.cpf}</small>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {client.observacoes && (
            <div className="observations-section">
              <h3>Observações</h3>
              <p>{client.observacoes}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
