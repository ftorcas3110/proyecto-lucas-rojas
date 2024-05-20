import { auth } from "@/auth"

async function layoutLicitaciones({ children }) {
    const session = await auth()
    return (
        <section>
            <h1 className="text-4xl">Licitaciones asignadas a {session.user?.name}</h1>
            <hr />
            {children}
        </section>
    )
}

export default layoutLicitaciones