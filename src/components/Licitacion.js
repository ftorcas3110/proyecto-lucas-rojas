
function Licitacion({ children, licitacion }) {
    return (
        <div style={{ 'border': '1px solid lightgrey', 'padding': '50px' }}>
            <p><strong>Cliente: {licitacion.cliente}</strong></p>
            <p><strong>Número expediente: {licitacion.numexpediente}</strong></p>
            <p>Título: {licitacion.titulo}</p>
            <p>Fecha de presentación: {licitacion.fechapresentacion}</p>
            <p>Tipo de Contrato: {licitacion.tipocontrato}</p>
            {/* <p></p>
            <p></p>
            <p></p> */}
            <p>Importe: {licitacion.importe.toString()} €</p>
            {children}
        </div>
    )
}

export default Licitacion