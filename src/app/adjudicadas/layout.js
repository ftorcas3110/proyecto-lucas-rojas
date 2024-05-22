async function layoutLicitaciones({ children }) {
        return (
        <section>
            <h1 className="text-4xl">Licitaciones adjudicadas</h1>
            <hr />
            {children}
        </section>
    )
}

export default layoutLicitaciones