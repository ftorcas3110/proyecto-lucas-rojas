

function layoutLicitaciones({ children }) {
    return (
        <section>
            <h1 className="text-4xl">Licitaciones Lucas Rojas</h1>
            <hr />
            <div className="w-[80%] mx-auto">
            {children}
            </div>
        </section>
    )
}

export default layoutLicitaciones