import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { AppContext } from "@context/ContextProvider";
import { useEffect, useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import config from "../src/aws-exports";

Amplify.configure({
	...config,
	ssr: true,
});

function MyApp({ Component, pageProps }: AppProps) {
	const [user, setUser] = useState<CognitoUser | null>(null);

	useEffect(() => {
		checkSession();
	}, []);

	const checkSession = async () => {
		try {
			const userData = await Auth.currentAuthenticatedUser();
			setUser(userData);
		} catch (error) {
			setUser(null);
		}
	};

	const logout = () => {
		try {
			Auth.signOut();
			setUser(null);
		} catch (error) {}
	};

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: "dark",
			}}
		>
			<AppContext.Provider value={{ user, logout, checkSession }}>
				<Component {...pageProps} />
			</AppContext.Provider>
		</MantineProvider>
	);
}

export default MyApp;
