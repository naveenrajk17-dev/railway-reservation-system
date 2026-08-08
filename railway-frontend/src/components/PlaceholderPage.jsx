function PlaceholderPage({ title, message }) {
    return (
        <section className="panel placeholder-page">
            <h2>{title}</h2>
            <p className="muted">{message}</p>
        </section>
    )
}

export default PlaceholderPage