import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Layout from '../components/Layout';

interface Props {
	data: Array<PostDetail>
};

interface PostDetail {
	userId: number,
	id: number,
	title: string,
	body: string,
	img: string
}

export default function post({ data }: Props) {
	return (
		<Layout titlePage='Post'>
			<div className="flex flex-wrap">
				{data.map((post, key) => 
					<div key={key} className="flex rounded-md shadow-lg w-full h-32 m-3 cursor-pointer hover:bg-gray-100">
						{post.img==null || post.img==='' || post.img===' ' || post.img==='null'?
						<div className='w-44 h-full flex justify-center items-center'>Image not found</div>
						:
						// <img src={post.img} alt="" className='w-44 h-full'  />
						<div className="w-44 h-full relative rounded-tl-md rounded-bl-md">
							<Image src={post.img} alt="" layout='fill' objectFit='fill' /* objectFit='cover' */  />
						</div>
						}
						<div className='p-5 flex-1'>
							<h1 className='font-medium text-lg'>{post.title}</h1>
							<p className='text-sm'>{post.body}</p>
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(process.env.API_URL + '/posts')
	const data = await res.json()

	return {
		props: {
			data
		}
	}
}