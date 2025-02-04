import { useQuery } from '@tanstack/react-query';
import { StyleSheet, View, Text } from "react-native";
import { fetchPokemons } from '@/lib/api'

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function TabOneScreen() {
	const { data } = useQuery<any[]>({
		queryKey: ['stream-hydrate-pokemons'],
		queryFn: () => fetchPokemons(),
		// suspense: true,
		staleTime: 5 * 1000
	})

	type dataPokemon = {
		/** The pokemon name */
		name: string,
		/** Url string to get detailed data from that pokemon */
		url: string
	}

	return <View style={{ flex: 1, height: '200', padding: 10 }}>
		<Text style={{ fontSize: 22 }}>Hello</Text>
		<View style={{ paddingVertical: 20 }}>
			{data?.results.map((item: dataPokemon) => {
				return <Text style={styles.textStyle} key={item.name}>{item.name}</Text>
			})}
		</View>
	</View>

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		height: 200,
		backgroundColor: 'pink'
	}
});
