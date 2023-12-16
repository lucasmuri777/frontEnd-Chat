import { GetServerSideProps } from "next"

type ChatProps = {
    id: string
}

export default function Chat({params}: {params: ChatProps} ) {
    return (
        <div><p>{params.id}</p></div>
    )

}
