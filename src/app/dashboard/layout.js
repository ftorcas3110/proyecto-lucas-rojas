import Buscador from "@/components/buscador";

function layoutLicitaciones({ children }) {
    return (
        <section>
            <h1 className="text-4xl">Licitaciones Lucas Rojas</h1>
            <hr />
            <Buscador/>
            {children}
        </section>
    )
}

export default layoutLicitaciones