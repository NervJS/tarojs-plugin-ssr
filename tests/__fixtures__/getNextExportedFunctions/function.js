export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps() {
    return {
        revalidate: 60,
        props: {
            data: {}
        }
    }
}
