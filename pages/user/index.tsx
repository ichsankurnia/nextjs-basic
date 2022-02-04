import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Error from "next/error";

type Props = {
	data: Array<any>,
	errorCode: number
};

function index({ data, errorCode }: Props) {
	const router = useRouter()
		return (
			<Layout titlePage="User Page">
				{data?
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
				:
				<Error statusCode={errorCode} />
				}
			</Layout>
		)
}

export async function getStaticProps() {
	// try {
	// 	const res = await axios.get(process.env.API_URL + '/user')
	// 	console.log(res.data)

	// 	return {
	// 		props: { data: res.data, errorCode: false },
	// 		// Next.js will attempt to re-generate the page:
	// 		// - When a request comes in
	// 		// - At most once every 10 seconds
	// 		revalidate: 10, // In seconds
	// 	}
	// } catch (error: any) {
	// 	return {
	// 		props: { data: null, errorCode: error.response!.status },
	// 		// revalidate: 10, // In seconds
	// 	}
	// }


	const res = await fetch(process.env.API_URL + '/user')
	const errorCode = res.ok ? false : res.status

	if(res.ok){
		const data = await res.json()
		return {
			props: { data, errorCode },
			// Next.js will attempt to re-generate the page:
			// - When a request comes in
			// - At most once every 10 seconds
			revalidate: 10, // In seconds
		}
	}else{
		return {
			props: { data: null, errorCode },
			revalidate: 10, // In seconds
		}
	}
}

export default index