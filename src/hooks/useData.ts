import { gql, useQuery } from '@apollo/client';

export const useData = <Result>(
	pipeline: { [key: string]: unknown }[],
	onComplete?: (data: Result) => void
) => {
	const { data, error, loading } = useQuery<
		{
			aggregate: Result;
		},
		{
			pipeline: { [key: string]: unknown }[];
		}
	>(
		gql`
			query Aggregate($pipeline: JSON!) {
				aggregate(pipeline: $pipeline)
			}
		`,
		{
			variables: {
				pipeline,
			},
			onError: (error) => {
				alert(error.message);
			},
			onCompleted: (data) => {
				if (onComplete) {
					onComplete(data.aggregate);
				}
			},
		}
	);

	return {
		data: data ? data.aggregate : undefined,
		error,
		loading,
	};
};
