import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import { AppContext } from "@context/ContextProvider";
import { useEffect, useState } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
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
		authListener();
	}, []);

	const checkSession = async () => {
		try {
			const userData = await Auth.currentAuthenticatedUser();
			setUser(userData);
		} catch (error) {}
	};

	const authListener = () => {
		Hub.listen("auth", (data: any) => {
			switch (data.payload.event) {
				case "signIn":
					checkSession();
					break;
				case "signOut":
					setUser(null);
					break;
			}
		});
	};

	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: "dark",
			}}
		>
			<AppContext.Provider value={{ user }}>
				<Component {...pageProps} />
			</AppContext.Provider>
		</MantineProvider>
	);
}

export default MyApp;
