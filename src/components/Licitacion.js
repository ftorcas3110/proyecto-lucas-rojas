
function Licitacion({ children, licitacion }) {
    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="col-span-4">
                <div style={{ 'border': '1px solid black', 'padding': '20px' }} className="mb-4 rounded-xl flex">
                    <div className="w-1/3 pr-8">
                        <p><strong>Cliente: {licitacion.cliente}</strong></p>
                        <p><strong>Número expediente: {licitacion.numexpediente}</strong></p>
                        <p>Título: {licitacion.titulo}</p>
                        <p>Fecha de presentación: {licitacion.fechapresentacion}</p>
                    </div>
                    <div className="w-1/3 pl-8">
                        <p>Tipo de Contrato: {licitacion.tipocontrato}</p>
                        <p>Tipo: {licitacion.tipo}</p>
                        <p>Importe: {licitacion.importe.toString()} €</p>
                    </div>
                    <div className="w-1/3 pl-8">
                        <p>Captada por: <strong>{licitacion.captadapor}</strong></p>
                        <p>Estudio por: <strong>{licitacion.estudiopor}</strong></p>
                        <p>Presupuesto por: <strong>{licitacion.presupuestopor}</strong></p>                        
                        <p>Presentada por: <strong>{licitacion.presentadapor}</strong></p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Licitacion