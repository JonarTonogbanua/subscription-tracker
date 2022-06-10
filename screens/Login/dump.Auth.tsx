import Layout from "@components/Layout";
import { Card, Group, Text, TextInput, Button } from "@mantine/core";
import { useState, FormEvent } from "react";
import { useAppContext } from "@context/ContextProvider";

const Login = () => {
	const [isSignin, setiIsSignin] = useState<boolean>(true);
	const [busy, setBusy] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
  const { userHasAuthenticated } = useAppContext()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    if(!email || !password) return
		
    if(isSignin) {
      setBusy(true);
      setTimeout(() => {
        userHasAuthenticated(true);
      }, 2000);
    } else {
      setBusy(true);
      setTimeout(() => {
        setiIsSignin(true);
        setBusy(false);
      }, 2000);
    }

	};

	return (
		<>
			<Layout>
				<form onSubmit={handleSubmit}>
					<div className="flex justify-center w-full">
						<Card className="bg-accent max-w-md w-full flex flex-col gap-5 shadow-lg">
							<div>
								<Text className="text-[22px] font-thin">
									{isSignin ? 'Sign in' : 'Sign up'} to get started
								</Text>
								{/* <Divider variant="dashed" /> */}
							</div>
							<TextInput
								disabled={busy}
								variant="filled"
								label="Email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<TextInput
								disabled={busy}
								variant="filled"
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<Group className={`mt-5 flex gap-3 ${isSignin ? 'justify-end flex-row' : 'justify-start flex-row-reverse'}`}>
								<Button
									type={isSignin ? 'button' : 'submit'}
									color="orange"
									variant={isSignin ? 'subtle' : 'outline'}
                  onClick={isSignin ? () => setiIsSignin(false) : undefined}
									loading={busy}
								>
									Sign up
								</Button>
								<Button
									type={isSignin ? 'submit' : 'button'}
									color="orange"
									variant={isSignin ? 'outline' : 'subtle'}
                  onClick={isSignin ? undefined : () => setiIsSignin(true) }
									loading={busy}
								>
									Sign in
								</Button>
							</Group>
						</Card>
					</div>
				</form>
			</Layout>
		</>
	);
};

export default Login;
