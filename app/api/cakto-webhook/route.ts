import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

interface WebhookPayload {
  event: string
  data: {
    id?: string
    plano_id?: string
    plano_nome?: string
    plano_preco?: number
    titular_nome?: string
    titular_data_n?: string
    titular_cpf?: string
    titular_cep?: string
    titular_numero?: string
    dependentes?: Array<{
      id?: string
      nome: string
      cpf?: string
      data_nascimento?: string
      relacao?: string
    }>
    assinatura_data?: string
    assinatura_id?: string
    status?: "pendente" | "ativo" | "cancelado"
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload: WebhookPayload = await request.json()

    if (!payload.event || !payload.data) {
      return NextResponse.json({ error: "Invalid payload structure" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const { data: webhookData } = payload

    // Map status based on event
    let status: "pendente" | "ativo" | "cancelado" = "pendente"
    if (payload.event === "purchase.completed") status = "ativo"
    if (payload.event === "purchase.failed") status = "cancelado"
    if (payload.event === "subscription.cancelled") status = "cancelado"

    const contractData = {
      plano_id: webhookData.plano_id || null,
      plano_nome: webhookData.plano_nome || null,
      plano_preco: webhookData.plano_preco || 0,
      titular_nome: webhookData.titular_nome || null,
      titular_data_n: webhookData.titular_data_n || null,
      titular_cpf: webhookData.titular_cpf || null,
      titular_cep: webhookData.titular_cep || null,
      titular_numero: webhookData.titular_numero || null,
      dependentes: webhookData.dependentes || [],
      assinatura_data: webhookData.assinatura_data || new Date().toISOString(),
      assinatura_id: webhookData.assinatura_id || null,
      status,
    }

    let result

    if (webhookData.id) {
      const { data, error } = await supabase.from("contratos").update(contractData).eq("id", webhookData.id).select()

      if (error) {
        console.error("[v0] Supabase update error:", error)
        return NextResponse.json({ error: "Failed to update contract", details: error.message }, { status: 500 })
      }

      result = data
    } else {
      const { data, error } = await supabase.from("contratos").insert([contractData]).select()

      if (error) {
        console.error("[v0] Supabase insert error:", error)
        return NextResponse.json({ error: "Failed to create contract", details: error.message }, { status: 500 })
      }

      result = data
    }

    console.log("[v0] Webhook processed successfully:", {
      event: payload.event,
      contractId: result?.[0]?.id,
      status,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Contract updated successfully",
        data: result,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      endpoint: "/api/cakto-webhook",
      method: "POST",
      description: "Webhook endpoint for Cacto purchase events",
    },
    { status: 200 },
  )
}
