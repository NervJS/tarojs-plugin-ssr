export const getStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps = async () => {
    return {
        revalidate: 60,
        props: {
            data: {}
        }
    }
}
