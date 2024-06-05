

function layoutLicitaciones({ children }) {
    return (
        <section>
            <h1 className="text-4xl font-bold text-gray-900 text-center mt-[150px] mb-8">Licitaciones Lucas Rojas</h1>
            <div className="w-[80%] mx-auto">
            {children}
            </div>
        </section>
    )
}

export default layoutLicitaciones