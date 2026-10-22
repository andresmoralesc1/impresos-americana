import { jsPDF } from "jspdf";

interface QuoteData {
  categoryName: string;
  substrateName: string;
  finishes: string;
  quantity: number;
  unitPriceCOP: number;
  totalCOP: number;
  discountPercent: number;
  customerCity: string;
}

export function generateQuotePDF(data: QuoteData) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const folio = `COT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const today = new Date().toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 1. Corporate Header Background (Stationery Facets matching Brand Guidelines)
  // Dark charcoal main bar
  doc.setFillColor(18, 18, 18);
  doc.rect(0, 0, 210, 26, "F");

  // Americana Action Red angled stripe
  doc.setFillColor(227, 6, 19);
  doc.rect(130, 0, 80, 26, "F");
  doc.triangle(115, 0, 130, 0, 130, 26, "F");

  // Red brand accent line
  doc.setFillColor(227, 6, 19);
  doc.rect(0, 26, 210, 2, "F");

  // Brand Name in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("IMPRESOS AMERICANA S.A.S.", 14, 14);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("NIT: 900.384.912-4 • Soluciones Industriales de Impresión & POP", 14, 20);

  // Quote Folio on Right side
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("COTIZACIÓN FORMAL", 160, 10);
  doc.setFontSize(9);
  doc.text(folio, 160, 16);

  // 2. Company & Client Metadata Box
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("DATOS DE LA PLANTA:", 14, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("Dirección: Calle 16 # 4-37, San Nicolás, Cali, Colombia", 14, 47);
  doc.text("PBX: (602) 885-4000 • WhatsApp: +57 316 320 0181", 14, 52);
  doc.text("Email: ventas@impresosamericana.com", 14, 57);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("CONDICIONES DE LA OFERTA:", 120, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(`Fecha de Emisión: ${today}`, 120, 47);
  doc.text("Validez: 15 días calendario", 120, 52);
  doc.text(`Ciudad de Destino: ${data.customerCity}`, 120, 57);

  // Separator rule
  doc.setDrawColor(220, 220, 220);
  doc.line(14, 63, 196, 63);

  // 3. Itemized Technical Breakdown Table
  doc.setFillColor(24, 24, 30);
  doc.rect(14, 68, 182, 8, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("DESCRIPCIÓN TÉCNICA DEL PRODUCTO", 18, 73);
  doc.text("CANT.", 130, 73);
  doc.text("VR. UNIT. (COP)", 148, 73);
  doc.text("TOTAL (COP)", 175, 73);

  // Row 1: Product details
  doc.setFillColor(248, 249, 250);
  doc.rect(14, 76, 182, 38, "F");

  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(data.categoryName, 18, 83);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  doc.text(`• Sustrato Base: ${data.substrateName}`, 18, 89);
  doc.text(`• Acabados Industriales: ${data.finishes || "Estándar"}`, 18, 94);
  doc.text("• Calidad de Impresión: Alta Resolución UV / Offset Digital FOGRA39", 18, 99);
  doc.text("• Prueba de Color: Muestra digital y dummy estructural aprobados", 18, 104);
  doc.text(`• Descuento por Volumen Aplicado: ${data.discountPercent}% OFF`, 18, 109);

  // Quantity and price columns
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 20);
  doc.setFontSize(9);
  doc.text(`${data.quantity} uds`, 130, 83);
  doc.text(`$${data.unitPriceCOP.toLocaleString("es-CO")}`, 148, 83);
  doc.text(`$${data.totalCOP.toLocaleString("es-CO")}`, 175, 83);

  // 4. Financial Totals Box
  const iva = Math.round(data.totalCOP * 0.19);
  const totalConIva = data.totalCOP + iva;

  const yTot = 120;
  doc.setDrawColor(220, 220, 220);
  doc.setFillColor(255, 255, 255);
  doc.rect(125, yTot, 71, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text("Subtotal Neto:", 130, yTot + 7);
  doc.text(`$${data.totalCOP.toLocaleString("es-CO")}`, 190, yTot + 7, { align: "right" });

  doc.text("IVA (19% DIAN):", 130, yTot + 14);
  doc.text(`$${iva.toLocaleString("es-CO")}`, 190, yTot + 14, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(227, 6, 19);
  doc.text("TOTAL FORMAL (COP):", 130, yTot + 22);
  doc.text(`$${totalConIva.toLocaleString("es-CO")}`, 190, yTot + 22, { align: "right" });

  // 5. Prepress & Quality Requirements
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("ESPECIFICACIONES DE PREPRENSA:", 14, 155);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(70, 70, 70);
  doc.text("1. Archivos en formato PDF/X-1a, Adobe Illustrator (.AI) con fuentes convertidas a curvas.", 14, 161);
  doc.text("2. Espacio de color CMYK estricto. Elementos en RGB serán convertidos bajo perfil FOGRA39.", 14, 166);
  doc.text("3. Sangrado perimetral mínimo de 5 mm para corte y troquelado.", 14, 171);
  doc.text("4. Resolución mínima para imágenes fotográficas: 300 DPI a escala 1:1.", 14, 176);

  // 6. Production & Delivery Terms
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text("CONDICIONES COMERCIALES Y DE DESPACHO:", 14, 188);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(70, 70, 70);
  doc.text("• Tiempo de Producción: 3 a 5 días hábiles a partir de la aprobación formal del arte final.", 14, 194);
  doc.text("• Facturación: Factura Electrónica DIAN emitida según Decreto 358 de 2020.", 14, 199);
  doc.text("• Forma de Pago: 50% anticipo al ordenar, 50% contra entrega o crédito corporativo a 30 días.", 14, 204);
  doc.text("• Garantía de Cero Desperdicio: Si el tiraje presenta discrepancia con la muestra aprobada, reimprimimos sin costo.", 14, 209);

  // 7. Footer Decorative Facet (matching Brand Guidelines Envelope / Stationery)
  doc.setFillColor(18, 18, 18);
  doc.rect(0, 286, 210, 11, "F");

  doc.setFillColor(227, 6, 19);
  doc.rect(150, 286, 60, 11, "F");
  doc.triangle(140, 297, 150, 286, 150, 297, "F");

  doc.setFillColor(227, 6, 19);
  doc.rect(0, 285, 210, 1, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Impresos Americana S.A.S. • Planta Principal Cali, Colombia • PBX: (602) 885-4000 • www.impresosamericana.com",
    14,
    292
  );

  // Save the PDF
  doc.save(`Impresos_Americana_${folio}.pdf`);
}
