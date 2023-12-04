export default function works({ params }: { params: { slug: string } }) {
    console.log(params);
    return (
        <>
            My Post: {params.slug}
        </>
    );
}
