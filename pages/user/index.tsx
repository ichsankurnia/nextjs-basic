import { useRouter } from "next/router";
import Layout from "../../components/Layout";

type Props = {
	data: Array<any>
};

function index({ data }: Props) {
	const router = useRouter()
	return (
		<Layout titlePage="User Page">
			<div className="flex flex-wrap">
				{data.map((user, key) => 
					<div key={key} className="flex flex-col rounded-md shadow-lg p-5 w-64 m-3 cursor-pointer hover:bg-gray-100"
						onClick={()=>router.push('/user/'+user.id)}
					>
						<h1>{user.id}</h1>
						<p>{user.name}</p>
						<p>{user.website}</p>
					</div>
				)}
			</div>
		</Layout>
	)
}

export async function getStaticProps() {
	const res = await fetch(process.env.API_URL + '/user')
	const data = await res.json()

	return {
		props: {
			data
		}
	}
}

export default index