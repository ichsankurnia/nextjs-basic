import { useRouter } from "next/router";
import Layout from "../../components/Layout";

type Props = {
	user: User
};

interface User {
	"id": number,
	"name": string,
	"username": string,
	"email": string,
	"address": object,
	"phone": string,
	"website": string,
	"company": object
}

export default function UserDetail({ user }: Props) {
	const router = useRouter()
	console.log(router)
	return (
		<Layout titlePage="User Detail">
			<div>
				<p>{user.id}</p>
				<p>{user.name}</p>
				<p>{user.email}</p>
				<p>{user.phone}</p>
				<p>{user.website}</p>
			</div>
		</Layout>
	)
}

export async function getStaticPaths() {
	const res = await fetch('http://localhost:1010/user')
	const dataUser = await res.json()

	const paths = dataUser.map((user: User) => {
		return {
			params: {
				userid: user.id.toString()
			}
		}
	})

	// { fallback: false } means other routes should 404.
  return { paths, fallback: false }

	// return {
	// 	paths: [
	// 		{ params: { id: '1' } },
	// 		{ params: { id: '2' } }
	// 	],
	// 	// paths: dataUser.map((user: User) => { return { params: {id: user.id} } })
	// 	fallback: ...
	// }
}

export async function getStaticProps(context: any) {
	console.log(context)
	const { userid } = context.params
	const res = await fetch('http://localhost:1010/user/' + userid)
	const user = await res.json()

	return {
		props: {
			user
		}
	}
}
