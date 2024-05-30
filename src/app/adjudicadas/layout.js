import Buscador from "@/components/buscadorAdjudicadas"
async function layoutLicitaciones({ children }) {
        return (
        <section>
            <h1 className="text-4xl">Licitaciones adjudicadas</h1>
            <hr />
            <div className="w-[80%] mx-auto">
            <Buscador/>
            {children}
            </div>
        </section>
    )
}

export default layoutLicitaciones