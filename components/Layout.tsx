import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
	children: ReactNode,
	titlePage: string
};

export default function Layout({ children, titlePage }: Props) {
	const { pathname } = useRouter()

	return (
		<>
			<Head>
				<title>{titlePage}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex min-h-screen flex-col">

				<nav className='flex justify-end space-x-3 p-5 shadow font-medium'>
					<Link href='/'><a className={`${pathname==='/' || pathname===''?'text-blue-500':'text-black'} hover:text-blue-500`}>Home</a></Link>
					<Link href='/post'><a className={`${pathname==='/post'?'text-blue-500':'text-black'}`}>Post</a></Link>
					<Link href='/user'><a className={`${pathname==='/user'?'text-blue-500':'text-black'}`}>User</a></Link>
				</nav>

				<main className="p-5">
					{children}
				</main>

				<footer className="mt-auto flex h-14 w-full items-center justify-center border-t">
					<a
						className="flex items-center justify-center"
						href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Powered by{' '}
						<img src="/vercel.svg" alt="Vercel Logo" className="ml-2 h-4" />
					</a>
				</footer>

			</div>
		</>
	)
}
