import { auth } from "@/auth"

async function layoutLicitaciones({ children }) {
    const session = await auth()
    return (
        <section>
            <h1 className="text-4xl">Licitaciones Lucas Rojas</h1>
            <hr />
            {children}
        </section>
    )
}

export default layoutLicitaciones