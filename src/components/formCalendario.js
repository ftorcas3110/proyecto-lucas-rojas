import Button from '@/components/button-form'

function formatForInput(dateString) {
    const date = new Date(dateString);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let hours = '' + date.getHours();
    let minutes = '' + date.getMinutes();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (hours.length < 2)
        hours = '0' + hours;
    if (minutes.length < 2)
        minutes = '0' + minutes;

    return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}`;
}

function Form({ action, title, evento, disabled = false, eliminar = false, onClick, fecha, usuario }) {
    console.log("Soy del formulario, mi fecha: "+ fecha);
    return (

        <form action={action}>

            <input type='hidden' name='id' value={evento?.id} />
            <input type='hidden' name='creador' value={usuario} />
            {eliminar !== true ? (
                <fieldset disabled={disabled}>
                    <div className='flex flex-col items-center mb-4 text-black'>
                        <div className='grid grid-cols-2 w-[80vw] items-center justify-center align-middle text-right'>
                            {fecha ? (
                                <>
                                    <label htmlFor='inicio' className='mb-2 text-3xl mr-20'>Fecha de inicio</label>
                                    <input type='hidden' id='inicio' name='inicio'
                                        value={fecha} className="border p-2 rounded text-center text-xl my-1" disabled />
                                    <input type='text' id='iniciomostrada' name='iniciomostrada'
                                        value={formatForInput(fecha)} className="border p-2 rounded text-center text-xl my-1" disabled/>
                                    <select id='inicio' name='inicio' className="border p-2 rounded text-center text-xl my-1" hidden>
                                        <option value={fecha}></option>
                                    </select>
                                </>
                            ) : (<>
                                <label htmlFor='inicio' className='mb-2 text-3xl mr-20'>Fecha de inicio</label>
                                <input type="datetime-local" id="inicio" name="inicio"
                                    defaultValue={evento?.start ? formatForInput(evento.start) : ''} // Se muestra el valor existente si existe
                                    className="border p-2 rounded text-center text-xl my-1"
                                    pattern='^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$' />
                            </>)}

                            {fecha ? (
                                <>
                                    <label htmlFor='fin' className='mb-2 text-3xl mr-20'>Fecha de fin</label>
                                    <input type='hidden' id='fin' name='fin'
                                        value={fecha} className="border p-2 rounded text-center text-xl my-1" disabled />
                                    <input type='text' id='finmostrada' name='finmostrada'
                                            value={formatForInput(fecha)} className="border p-2 rounded text-center text-xl my-1" disabled/>
                                        <select id='fin' name='fin' className="border p-2 rounded text-center text-xl my-1" hidden>
                                        <option value={fecha}></option>
                                    </select>
                                </>
                            ) : (<>
                                <label htmlFor='fin' className='mb-2 text-3xl mr-20'>Fecha de finalización</label>
                                <input type="datetime-local" id="fin" name="fin"
                                    defaultValue={evento?.end ? formatForInput(evento.end) : ''} // Se muestra el valor existente si existe
                                    className="border p-2 rounded text-center text-xl my-1"
                                    pattern='^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$' />
                            </>)}

                            <label htmlFor='descripcion' className='mb-2 text-3xl mr-20'>Descripción</label>
                            <input type='text' id='descripcion' name='descripcion'
                                defaultValue={evento?.descripcion}
                                className="border p-2 rounded text-center text-xl my-1" />

                            <label htmlFor='categoria' className='mb-2 text-3xl mr-20'>Categoría</label>
                            <select id='categoria' name='categoria' className="border p-2 rounded text-center text-xl my-1">
                                {evento?.categoria && (
                                    <option value={evento?.categoria}>{evento?.categoria}</option>
                                )}
                                <option value="ANEXOS">Anexos</option>
                                <option value="DESESTIMADA">Desestimada</option>
                                <option value="EN ESTUDIO">En estudio</option>
                                <option value="PRESENTACIÓN">Presentación</option>
                                <option value="PRESENTADA">Presentada</option>
                                <option value="PRESUPUESTO">Presupuesto</option>
                                <option value="REQUERIMIENTOS">Requerimientos</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
            ) : (
                <>
                    <br />
                </>
            )}
            <Button title={title} onClick={onClick} />
        </form>
    )
}

export default Form