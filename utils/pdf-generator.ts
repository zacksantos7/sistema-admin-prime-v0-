import jsPDF from "jspdf"
import html2canvas from "html2canvas"

export async function generateCardPDF(cardElement: HTMLElement, clientName: string) {
  try {
    const canvas = await html2canvas(cardElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
    })

    // Cartão no tamanho padrão (85.6 x 53.98 mm)
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [85.6, 53.98],
    })

    const imgData = canvas.toDataURL("image/png")
    pdf.addImage(imgData, "PNG", 0, 0, 85.6, 53.98)

    pdf.save(`carteirinha-${clientName}-${new Date().getTime()}.pdf`)
  } catch (error) {
    console.error("[v0] Error generating PDF:", error)
    alert("Erro ao gerar PDF da carteirinha")
  }
}
