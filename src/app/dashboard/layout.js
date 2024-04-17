import Buscador from "@/components/buscador";

function layoutLicitaciones({ children }) {
    return (
        <section>
            <h1 className="text-4xl">Licitaciones Lucas Rojas</h1>
            <hr />
            <div className="w-[80%] mx-auto">
            <Buscador/>
            <p className="text-3xl">Todas las licitaciones</p>
            {children}
            </div>
        </section>
    )
}

export default layoutLicitaciones