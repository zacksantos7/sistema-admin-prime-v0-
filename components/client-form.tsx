"use client"

import type React from "react"
import { useState } from "react"
import type { Client, ClientStatus, Dependent } from "@/app/page"

type FormMode = "create" | "edit" | "add-dependent"

interface Props {
  mode: FormMode
  initial?: Client
  allClients?: Client[] // added to list available titulars for dependents
  onSubmit: (data: Omit<Client, "id" | "criadoEm"> | Dependent) => void
  onCancel: () => void
}

const emptyForm: Omit<Client, "id" | "criadoEm"> = {
  nome: "",
  cpf: "",
  telefone: "",
  plano: "Básico",
  status: "ativo",
  observacoes: "",
  dataNascimento: "",
  cep: "",
  endereco: "",
  cidade: "",
  estado: "",
  dependentes: [],
}

const emptyDependent: Dependent = {
  id: "",
  nome: "",
  cpf: "",
  dataNascimento: "",
  relacao: "",
}

export const ClientForm: React.FC<Props> = ({ mode, initial, allClients = [], onSubmit, onCancel }) => {
  const [form, setForm] = useState<Omit<Client, "id" | "criadoEm">>(initial ?? emptyForm)
  const [dependent, setDependent] = useState<Dependent>(emptyDependent)
  const [selectedTitularId, setSelectedTitularId] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleDependentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDependent((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (status: ClientStatus) => {
    setForm((prev) => ({ ...prev, status }))
  }

  const handlePlanoChange = (plano: string) => {
    setForm((prev) => ({ ...prev, plano }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "add-dependent") {
      if (!dependent.nome.trim() || !selectedTitularId) {
        alert("Selecione o titular e preencha o nome do dependente")
        return
      }

      const titular = allClients.find((c) => c.id === selectedTitularId)
      if (!titular) {
        alert("Titular não encontrado")
        return
      }

      const newDependent: Dependent = {
        id: crypto.randomUUID(),
        ...dependent,
      }

      const updatedTitular = {
        ...titular,
        dependentes: [...(titular.dependentes || []), newDependent],
      }

      onSubmit(updatedTitular)
      setDependent(emptyDependent)
      setSelectedTitularId("")
    } else {
      if (!form.nome.trim() || !form.cpf.trim()) {
        alert("Nome e CPF são obrigatórios.")
        return
      }
      onSubmit(form)
      if (mode === "create") {
        setForm(emptyForm)
      }
    }
  }

  if (mode === "add-dependent") {
    return (
      <form className="card card--form" onSubmit={handleSubmit}>
        <h3 style={{ margin: "0 0 16px 0", color: "#1a1a1a" }}>Adicionar Dependente</h3>

        <div className="field">
          <span>Titular *</span>
          <select
            value={selectedTitularId}
            onChange={(e) => setSelectedTitularId(e.target.value)}
            className="field-select"
          >
            <option value="">Selecione o titular...</option>
            {allClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nome} ({client.plano})
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <span>Nome do dependente *</span>
          <input name="nome" value={dependent.nome} onChange={handleDependentChange} placeholder="Ex: Maria Silva" />
        </div>

        <div className="field">
          <span>CPF</span>
          <input name="cpf" value={dependent.cpf || ""} onChange={handleDependentChange} placeholder="000.000.000-00" />
        </div>

        <div className="field">
          <span>Data de Nascimento</span>
          <input
            type="date"
            name="dataNascimento"
            value={dependent.dataNascimento || ""}
            onChange={handleDependentChange}
          />
        </div>

        <div className="field">
          <span>Relação com o titular</span>
          <select
            name="relacao"
            value={dependent.relacao || ""}
            onChange={handleDependentChange}
            className="field-select"
          >
            <option value="">Selecione...</option>
            <option value="cônjuge">Cônjuge</option>
            <option value="filho">Filho</option>
            <option value="filha">Filha</option>
            <option value="pai">Pai</option>
            <option value="mãe">Mãe</option>
            <option value="irmão">Irmão</option>
            <option value="irmã">Irmã</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn--primary">
            Adicionar dependente
          </button>
        </div>
      </form>
    )
  }

  return (
    <form className="card card--form" onSubmit={handleSubmit}>
      {/* Personal Info Section */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1a1a1a" }}>Informações Pessoais</h3>

        <div className="field">
          <span>Nome completo *</span>
          <input name="nome" value={form.nome} onChange={handleChange} placeholder="Ex: Maria da Silva" />
        </div>

        <div className="field">
          <span>CPF *</span>
          <input name="cpf" value={form.cpf} onChange={handleChange} placeholder="000.000.000-00" />
        </div>

        <div className="field">
          <span>Data de Nascimento</span>
          <input type="date" name="dataNascimento" value={form.dataNascimento || ""} onChange={handleChange} />
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1a1a1a" }}>Contato</h3>

        <div className="field">
          <span>Telefone / WhatsApp</span>
          <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="(31) 9 9999-9999" />
        </div>
      </div>

      {/* Address Section */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1a1a1a" }}>Endereço</h3>

        <div className="field">
          <span>CEP</span>
          <input name="cep" value={form.cep || ""} onChange={handleChange} placeholder="00000-000" />
        </div>

        <div className="field">
          <span>Endereço</span>
          <input
            name="endereco"
            value={form.endereco || ""}
            onChange={handleChange}
            placeholder="Rua, avenida, etc..."
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="field" style={{ marginBottom: 0 }}>
            <span>Cidade</span>
            <input name="cidade" value={form.cidade || ""} onChange={handleChange} placeholder="Belo Horizonte" />
          </div>

          <div className="field" style={{ marginBottom: 0 }}>
            <span>Estado</span>
            <input name="estado" value={form.estado || ""} onChange={handleChange} placeholder="MG" />
          </div>
        </div>
      </div>

      {/* Plan Section - changed from input to radio buttons */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1a1a1a" }}>Plano Contratado</h3>

        <div className="field" style={{ marginBottom: 0 }}>
          <div className="plano-options">
            {(["Básico", "Intermediário", "Premium"] as const).map((plano) => (
              <label key={plano} className="plano-radio">
                <input
                  type="radio"
                  name="plano"
                  value={plano}
                  checked={form.plano === plano}
                  onChange={() => handlePlanoChange(plano)}
                />
                <span className="plano-label">{plano}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Status Section */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", color: "#1a1a1a" }}>Status</h3>

        <div className="field" style={{ marginBottom: 0 }}>
          <div className="chips">
            {(["ativo", "pendente", "cancelado"] as const).map((status) => (
              <button
                type="button"
                key={status}
                className={"chip " + (form.status === status ? "chip--active" : "")}
                onClick={() => handleStatusChange(status)}
              >
                {status === "ativo" ? "Ativo" : status === "pendente" ? "Pendente" : "Cancelado"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Observations Section */}
      <div className="field">
        <span>Observações internas</span>
        <textarea
          name="observacoes"
          value={form.observacoes ?? ""}
          onChange={handleChange}
          placeholder="Ex: indicou amigo, prefere contato à tarde..."
          rows={3}
        />
      </div>

      <div className="form-actions">
        {mode === "edit" && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancelar edição
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          {mode === "create" ? "Adicionar cliente" : "Salvar alterações"}
        </button>
      </div>
    </form>
  )
}
