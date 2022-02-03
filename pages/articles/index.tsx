import Link from 'next/link'

export default function Articles() {
    return <div className={"p-3"}>
            <h1 className={"text-5xl font-normal leading-normal mt-0 mb-2"}>Articles:</h1>
            <Link href={'articles/1'}>
                <a className={""}>&rarr; First Article</a>
            </Link>
        </div>
}