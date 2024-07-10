import PDFDocument from 'pdfkit';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatePDF = (data) => {
    const pdfPath = path.join(__dirname,'../files', `${data.codigo}.pdf`)
    // Crear el documento PDF
    const doc = new PDFDocument(
        {
            size: 'A4',
            margin: 50
        }
    );

    doc.pipe(fs.createWriteStream(pdfPath));

    const logoPath = path.join('static', 'img', 'logo.jpg');
    // Agregar la imagen
    doc.image(logoPath, 50, 20, { width: 250 })

    // Título y encabezado
    doc.moveDown();
    doc.fontSize(10).text('NOMBRE: INNOVATECNICA SAS', 52, 180);
    doc.text('NIT: 901280407-2', 52, 195);
    doc.text('CONTACTO: 3166181647', 52, 210);
    doc.text('DIRECCIÓN: Carrera 19 # 32A-31 Sur', 52, 225);
    //doc.rect(50, 175, 300, 65).stroke('#000').fillColor('#000')

    // Información del cliente

    doc.moveDown();
    doc.text(`CLIENTE: ${data.Cotizacion.Cliente.nombre}`, 50, 255);
    doc.text(`DIRECCIÓN: ${data.Cotizacion.Cliente.direccion}`, 50, 270);
    doc.text(`CIUDAD: ${data.Cotizacion.Cliente.ciudad}`, 370, 255);
    doc.text(`NIT: ${data.Cotizacion.Cliente.nit}`, 370, 270);

    // Información de la remisión y cotización
    doc.fontSize(10).text('REMISIÓN', 350, 70, { align: 'center' })
    doc.moveDown();
    doc.text(`${data.codigo}`, 350, 85, { align: 'center' });
    doc.text(`Número Pedido Proveedor`, 350, 100, { align: 'center' });
    doc.text(`${data.ordenCompra}`, 350, 115, { align: 'center' });
    doc.fontSize(10).text('Fecha', 350, 130, { align: 'center' })
    doc.text(`${new Date(data.fecha).toLocaleDateString()}`, 350, 145, { align: 'center' });

    // Tabla de productos
    doc.moveDown().moveDown();
    doc.text('CANTIDAD', 52, 300, { width: 70 });
    doc.text('DESCRIPCIÓN', 120, 300, { width: 230 });
    doc.text('P. UNITARIO', 350, 300, { width: 100, align: 'center' });
    doc.text('IMPORTE', 450, 300, { width: 100, align: 'center' });
    doc.rect(50, 295, 500, 20).stroke()
        .fillColor('#000')

    let y = 315;
    data.Cotizacion.DetalleCotizacions.forEach((detalle) => {
        const descripcion = detalle.Producto.descripcion;
        const descripcionHeight = doc.heightOfString(descripcion, { width: 300 });
        const rowHeight = Math.max(20, descripcionHeight + 10);

        doc.rect(50, y, 500, rowHeight).stroke()
            .fillColor('#000')
        doc.text(detalle.cantidad, 50, y+5, { width: 70, align: 'center' });
        doc.text(`${detalle.Producto.nombre}`, 120, y+5, { width: 230 });
        doc.text('-', 350, y+5, { width: 100, align: 'center' });
        doc.text('-', 450, y+5, { width: 100, align: 'center' });
        y += 22;
    });

    // Subtotales y totales
    y += 20;
    doc.text('SUBTOTAL ', 320, y, { align: 'right', width: 100 });
    doc.text('-', 480, y, { width: 50, align: 'center' });
    y += 20;
    doc.text('IVA ', 320, y, { align: 'right', width: 100 });
    doc.text('-', 480, y, { width: 50, align: 'center' });
    y += 20;
    doc.text('TOTAL ', 320, y, { align: 'right', width: 100 });
    doc.text('-', 480, y, { width: 50, align: 'center' });

    doc.moveDown().moveDown()

    y += 40
    doc.text('DESCRIPCIÓN', 52, y + 4, { align: 'center' });
    doc.rect(50, y, 500, 15).stroke()
        .fillColor('#000')
    y += 15
    data.Cotizacion.DetalleCotizacions.forEach((detalle) => {
        const descripcion = detalle.Producto.descripcion;
        const descripcionHeight = doc.heightOfString(descripcion, { width: 300 });
        const rowHeight = Math.max(20, descripcionHeight + 10);

        doc.rect(50, y, 500, rowHeight).stroke()
            .fillColor('#000')
        doc.text(`${detalle.Producto.descripcion}`, 52, y + 3);
        y += 22;
    });


    //firma comformidad
    y += 80
    doc.text('FIRMA DE CONFORMIDAD', 50, y, { width: 300, align: 'center' });
    doc.rect(380, y - 28, 150, 60).fillAndStroke('#f0f0f0', '#000').fillColor('#000')


    // Información de contacto

    y += 80;
    doc.text('Si tiene alguna duda, póngase en contacto con INNOVATECNICA SAS', 50, y, { align: 'center' });
    doc.text('NIT: 901280407-2, Cel: 3166181647, Email: innovatecnicasas@gmail.com', 50, y + 15, { align: 'center' });
    doc.text('FIRMA DE CONFORMIDAD', 50, y + 30, { align: 'center' });

    doc.opacity(0.1)
        .image(logoPath, doc.page.width / 2 - 250, doc.page.height / 2 - 250, { width: 500 })
        .opacity(1);

    doc.end();

}