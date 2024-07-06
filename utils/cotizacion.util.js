import PDFDocument from 'pdfkit';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatePDF = (cotizacion) => {
    const doc = new PDFDocument({
        size: 'A4',
        margin: 50
    });

const pdfPath = path.join(__dirname,'../files', `${cotizacion.codigo}.pdf`)
    // Stream the PDF to a file
    doc.pipe(fs.createWriteStream(pdfPath));

    // Load logo
    const logoPath = path.join('static', 'img', 'logo.jpg');
    doc.image(logoPath, 50, 20, { width: 250 })
       .fillColor('#000')
       .fontSize(10)
       .text('INNOVATECNICA SAS', 320, 95)
       .fontSize(10)
       .text('Carrera 19 # 32A - 31 Sur', 320, 110)
       .text('3156437067', 320, 125)
       .text('Innovatecnicasas@gmail.com', 320, 140)
       .moveDown();

    doc.fillColor('#000')
       .fontSize(10)
       .text(`Empresa: ${cotizacion.Cliente.nombre}`, 50, 200)
       .text(`Fecha: ${new Date(cotizacion.fecha).toLocaleDateString()}`, 320, 200)
       .text(`Nº Cotización: ${cotizacion.codigo}`, 320, 220)
       .text(`NIT: ${cotizacion.Cliente.nit}`, 50, 220)
       .text(`Dirección: ${cotizacion.Cliente.direccion}`, 50, 240)
       .text(`Ciudad: ${cotizacion.Cliente.ciudad}`, 50, 260)
       .moveDown();

    doc.fillColor('#444444')
       .rect(50, 280, 500, 20).fillAndStroke('#f0f0f0', '#000')
       .fontSize(10)
       .fillColor('#000')
       .text('CANT.', 55, 285, { width: 50, align: 'left' })
       .text('DESCRIPCIÓN', 105, 285, { width: 150, align: 'left' })
       .text('P. UNITARIO', 365, 285, { width: 100, align: 'right' })
       .text('TOTAL', 445, 285, { width: 90, align: 'right' })
       .moveDown();

    let y = 300;
    cotizacion.DetalleCotizacions.forEach((detalle) => {
        const descripcion = detalle.Producto.descripcion;
        const descripcionHeight = doc.heightOfString(descripcion, { width: 300 });
        const rowHeight = Math.max(20, descripcionHeight + 10);

        doc.rect(50, y, 500, rowHeight).stroke()
           .fillColor('#000')
           .fontSize(10)
           .text(detalle.cantidad, 55, y + 5, { width: 50, align: 'left' })
           .text(descripcion, 105, y + 5, { width: 300, align: 'left' })
           .text(`$${detalle.precio}`, 365, y + 5, { width: 100, align: 'right' })
           .text(`$${(detalle.cantidad * detalle.precio).toFixed(2)}`, 455, y + 5, { width: 90, align: 'right' });

        y += rowHeight;
    });

    // Totals
    y += 20;
    const ivaAmount = cotizacion.subtotal * (cotizacion.iva / 100);
    doc.fillColor('#000')
       .fontSize(10)
       .text(`Total parcial: $${cotizacion.subtotal}`, 355, y, { align: 'right' })
       .text(`Impuestos (IVA ${cotizacion.iva}%): $${ivaAmount.toFixed(2)}`, 355, y + 20, { align: 'right' })
       .text(`TOTAL: $${(parseFloat(cotizacion.subtotal) + parseFloat(ivaAmount)).toFixed(2)}`, 355, y + 40, { align: 'right' })
       .moveDown();

    //y += 60;
    doc.fillColor('#000')
       .fontSize(10)
       .text('Términos y Condiciones', 50, y, { underline: true })
       .text('1.- Duración de la Oferta 30 días\n2.- Crédito de 90 días\n3.- Trans Davivienda 108900129488', 50, y + 20)
       .moveDown();


    y += 80;
    doc.fillColor('#000')
       .fontSize(10)
       .text('Gracias por la Preferencia!!!', { align: 'center' });


    const watermarkPath = path.join('static', 'img', 'logo.jpg');
    doc.opacity(0.1)
       .image(watermarkPath, doc.page.width / 2 - 250, doc.page.height / 2 - 250, { width: 500 })
       .opacity(1);

    // Finalize the PDF and end the stream
    doc.end();
    return pdfPath
};