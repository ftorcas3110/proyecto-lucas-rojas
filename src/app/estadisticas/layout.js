

function layoutLicitaciones({ children }) {
    return (
        <section>
            <h1 className="text-4xl">Licitaciones Lucas Rojas</h1>
            <hr />
            <div className="mx-auto">
            {children}
            </div>
        </section>
    )
}

export default layoutLicitaciones