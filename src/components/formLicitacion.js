import Button from '@/components/button-form'
 
function Form({ action, title, licitacion, disabled=false }) {

    return (
        <form action={action} >
            <input type='hidden' name='id' value={licitacion?.id} />
            <fieldset disabled={disabled}>

                <label htmlFor='cliente'>Cliente</label>
                <input type='text' id='cliente' name='cliente'
                defaultValue={licitacion?.cliente} autoFocus ></input>

                <label htmlFor='numexpediente'>Número de expediente</label>
                <input type='text' id='numexpediente' name='numexpediente'
                defaultValue={licitacion?.numexpediente} />

                <label htmlFor='numexpediente'>Número de expediente</label>
                <input type='text' id='numexpediente' name='numexpediente'
                defaultValue={licitacion?.numexpediente} />
                
                <label htmlFor='precio'>Precio</label>
                <input type='number' id='precio' name='precio' min='0' step={0.01}
                defaultValue={Number(licitacion?.precio)} />

            </fieldset>
            <Button title={title} />
        </form>
    )
}

export default Form