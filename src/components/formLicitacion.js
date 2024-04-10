import Button from '@/components/button-form'

function Form({ action, title, licitacion, disabled = false }) {

    return (
        <form action={action}>

            <input type='hidden' name='item' value={licitacion?.item} />
            <fieldset disabled={disabled}>
                <div className='flex flex-col items-center mb-4 text-black'>
                    <div className='grid grid-cols-2 w-[80vw]'>
                        <label htmlFor='cliente' className='mb-2 text-3xl'>Cliente</label>
                        <input type='text' id='cliente' name='cliente'
                            defaultValue={licitacion?.cliente} className="border p-2 rounded text-center text-xl mb-3"></input>

                        <label htmlFor='titulo' className='mb-2 text-3xl'>Título</label>
                        <input type='text' id='titulo' name='titulo'
                            defaultValue={licitacion?.titulo} className="border p-2 rounded text-center text-xl mb-3" />

                        <label htmlFor='numexpediente' className='mb-2 text-3xl'>Número de expediente</label>
                        <input type='text' id='numexpediente' name='numexpediente'
                            defaultValue={licitacion?.numexpediente} className="border p-2 rounded text-center text-xl mb-3" />

                        <label htmlFor='fechapresentacion' className='mb-2 text-3xl'>Fecha de presentación (DD/MM/AAAA)</label>
                        <input type='text' id='fechapresentacion' name='fechapresentacion'
                            defaultValue={licitacion?.fechapresentacion}
                            className="border p-2 rounded text-center text-xl mb-3"
                            pattern='^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$' />

                        <label htmlFor='tipo' className='mb-2 text-3xl'>Tipo</label>
                        <select id='tipo' name='tipo' className="border p-2 rounded text-center text-xl mb-3">
                            <option value="LICITACION">Licitación</option>
                            <option value="CONTRATO MENOR">Contrato menor</option>
                            <option value="ACUERDO MARCO">Acuerdo marco</option>
                            <option value="LIC NO PUBLICA">Licitación no pública</option>
                            <option value="INVITACION">Invitación</option>
                        </select>

                        <label htmlFor='tipocontrato' className='mb-2 text-3xl'>Tipo de contrato</label>
                        <select id='tipocontrato' name='tipocontrato' className="border p-2 rounded text-center text-xl mb-3">
                            <option value="MAT OFICINA">Material de oficina</option>
                            <option value="MAQ OFICINA">Maquinaria de oficina</option>
                            <option value="INFORMÁTICA">Informática</option>
                            <option value="EPI'S">EPIs</option>
                            <option value="MOBILIARIO">Mobiliario</option>
                            <option value="ROPA LABORAL">Ropa laboral</option>
                            <option value="JUEGOS">Juegos</option>
                            <option value="LIMPIEZA">Limpieza</option>
                            <option value="SSGG">SSGG</option>
                            <option value="OTROS">Otros</option>
                        </select>

                        <label htmlFor='importe' className='mb-2 text-3xl'>Importe (sin símbolo de €)</label>
                        <input type='number' id='importe' name='importe' min='0' step={0.01}
                            defaultValue={Number(licitacion?.importe)}
                            className="border p-2 rounded text-center text-xl mb-3"
                            pattern='/^\d*\.?\,?\d*$/' />

                        <label htmlFor='presupuesto' className='mb-2 text-3xl'>Presupuesto</label>
                        <select id='presupuesto' name='presupuesto' className="border p-2 rounded text-center text-xl mb-3">
                            <option value="ELENA ALCAIDE">Elena Alcaide</option>
                            <option value="JOSÉ M QUERO">José M Quero</option>
                            <option value="MARÍA JOSÉ FERNÁNDEZ">María José Fernández</option>
                            <option value="MARIAM SIERRA">Mariam Sierra</option>
                            <option value="MIGUEL JURADO">Miguel Jurado</option>
                            <option value="PILAR MARÍN">Pilar Marín</option>
                            <option value="SANTIAGO MONTEJO">Santiago Montejo</option>
                            <option value="SARA REYES">Sara Reyes</option>
                            <option value="SILVIA ALCAIDE">Silvia Alcaide</option>
                            <option value="">En blanco</option>
                        </select>

                        <label htmlFor='presentadapor' className='mb-2 text-3xl'>Presentada por</label>
                        <select id='presentadapor' name='presentadapor' className="border p-2 rounded text-center text-xl mb-3">
                            <option value="JOSÉ M QUERO">José M Quero</option>
                            <option value="JUAN G. MARTÍNEZ">Juan G. Martínez</option>
                            <option value="MARÍA JOSÉ FERNÁNDEZ">María José Fernández</option>
                            <option value="MARIAM SIERRA">Mariam Sierra</option>
                            <option value="MIGUEL JURADO">Miguel Jurado</option>
                            <option value="SANTIAGO MONTEJO">Santiago Montejo</option>
                            <option value="SARA REYES">Sara Reyes</option>
                            <option value="SILVIA ALCAIDE">Silvia Alcaide</option>
                            <option value="">En blanco</option>
                        </select>

                        <label htmlFor='estadoini' className='mb-2 text-3xl'>Estado inicial</label>
                        <select id='estadoini' name='estadoini' className="mb-3 border p-2 rounded text-center text-xl">
                            <option value="PRESENTADA">Presentada</option>
                            <option value="EN ESTUDIO">En estudio</option>
                            <option value="ANULADA">Anulada</option>
                            <option value="DESESTIMADA">Desestimada</option>
                        </select>


                        <label htmlFor='estadofinal' className='mb-2 text-3xl'>Estado final</label>
                        <select id='estadofinal' name='estadofinal' className="mb-3 border p-2 rounded text-center text-xl">
                            <option value="ADJUDICADA">Adjudicada</option>
                            <option value="ANULADA">Anulada</option>
                            <option value="DESESTIMADA">Desestimada</option>
                            <option value="DESIERTA">Desierta</option>
                            <option value="EN ESPERA RESOLUCIÓN">En espera resolución</option>
                            <option value="NO ADJUDICADA">No adjudicada</option>
                            <option value="">En blanco</option>
                        </select>

                        <label htmlFor='duracioncontratoanyo' className='mb-2 text-3xl'>Duración de contrato</label>
                        <input type='text' id='duracioncontratoanyo' name='duracioncontratoanyo'
                            defaultValue={licitacion?.duracioncontratoanyo}
                            className="border p-2 rounded text-center text-xl mb-3" />

                        <label htmlFor='observaciones' className='mb-2 text-3xl'>Observaciones</label>
                        <textarea id='observaciones' name='observaciones'
                            rows="3"
                            cols="50"
                            defaultValue={licitacion?.observaciones}
                            className="border p-2 rounded text-center text-xl mb-3" />
                    </div>
                </div>
            </fieldset>
            <Button title={title} />
        </form>
    )
}

export default Form