import { NextPageContext } from "next"

interface Props {
	statusCode: number
}

function Error({ statusCode }: Props) {
	return (
		<div className="flex justify-center items-center" style={{width: '75vh'}}>
			<p>
				{statusCode
					? `An error ${statusCode} occurred on server`
					: `An error occurred ${statusCode} on client`}
			</p>
		</div>
	)
}

Error.getInitialProps = ({ res, err } : NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error