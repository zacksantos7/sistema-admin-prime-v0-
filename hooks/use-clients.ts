"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { Client } from "@/app/page"

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchClients()

    const channel = supabase
      .channel("contratos_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contratos",
        },
        () => {
          fetchClients()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  async function fetchClients() {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("contratos").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching clients:", error)
        setClients([])
        return
      }

      const mappedClients: Client[] = (data || []).map((contract: any) => ({
        id: contract.id,
        nome: contract.titular_nome || "",
        cpf: contract.titular_cpf || "",
        telefone: contract.titular_telefone || "",
        plano: contract.plano_nome || "",
        status: contract.status || "ativo",
        criadoEm: contract.created_at || new Date().toISOString(),
        dataNascimento: contract.titular_data_n || undefined,
        cep: contract.titular_cep || undefined,
        endereco: contract.titular_endereco || undefined,
        cidade: contract.titular_cidade || undefined,
        estado: contract.titular_estado || undefined,
        observacoes: contract.observacoes || undefined,
        dependentes: contract.dependentes
          ? Array.isArray(contract.dependentes)
            ? contract.dependentes.map((dep: any) => ({
                id: dep.id || crypto.randomUUID(),
                nome: dep.nome || "",
                cpf: dep.cpf || undefined,
                dataNascimento: dep.data_nascimento || undefined,
                relacao: dep.relacao || undefined,
              }))
            : []
          : [],
      }))

      setClients(mappedClients)
    } catch (err) {
      console.error("[v0] Error in fetchClients:", err)
      setClients([])
    } finally {
      setLoading(false)
    }
  }

  async function addClient(data: Omit<Client, "id" | "criadoEm">) {
    try {
      const { error } = await supabase.from("contratos").insert([
        {
          titular_nome: data.nome,
          titular_cpf: data.cpf,
          titular_telefone: data.telefone,
          titular_data_n: data.dataNascimento || null,
          titular_cep: data.cep || null,
          titular_endereco: data.endereco || null,
          titular_cidade: data.cidade || null,
          titular_estado: data.estado || null,
          plano_nome: data.plano,
          status: data.status,
          observacoes: data.observacoes || null,
          dependentes: data.dependentes || [],
        },
      ])

      if (error) {
        console.error("[v0] Error adding client:", error)
        alert("Erro ao adicionar cliente")
        return
      }

      await fetchClients()
    } catch (err) {
      console.error("[v0] Error in addClient:", err)
    }
  }

  async function updateClient(id: string, data: Omit<Client, "id" | "criadoEm">) {
    try {
      const { error } = await supabase
        .from("contratos")
        .update({
          titular_nome: data.nome,
          titular_cpf: data.cpf,
          titular_telefone: data.telefone,
          titular_data_n: data.dataNascimento || null,
          titular_cep: data.cep || null,
          titular_endereco: data.endereco || null,
          titular_cidade: data.cidade || null,
          titular_estado: data.estado || null,
          plano_nome: data.plano,
          status: data.status,
          observacoes: data.observacoes || null,
          dependentes: data.dependentes || [],
        })
        .eq("id", id)

      if (error) {
        console.error("[v0] Error updating client:", error)
        alert("Erro ao atualizar cliente")
        return
      }

      await fetchClients()
    } catch (err) {
      console.error("[v0] Error in updateClient:", err)
    }
  }

  async function deleteClient(id: string) {
    try {
      const { error } = await supabase.from("contratos").delete().eq("id", id)

      if (error) {
        console.error("[v0] Error deleting client:", error)
        alert("Erro ao deletar cliente")
        return
      }

      await fetchClients()
    } catch (err) {
      console.error("[v0] Error in deleteClient:", err)
    }
  }

  return {
    clients,
    loading,
    addClient,
    updateClient,
    deleteClient,
  }
}
