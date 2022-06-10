import Layout from "@components/Layout";
import { Auth } from "aws-amplify";
import { Card, Group, Text, TextInput, Button } from "@mantine/core";
import { useState, FormEvent } from "react";
import { useAppContext, AppContext } from "@context/ContextProvider";

const initialFormState = {
	username: "",
	email: "",
	password: "",
	authCode: "",
	formType: "signIn",
};

const SignIn = () => {
	const { onChangeHandler, updateFormType } = useAppContext();

	return (
		<>
			<div>
				<Text className="text-[22px] font-thin">Sign in to get started</Text>
			</div>
			<TextInput
				variant="filled"
				label="Username"
				name="username"
				onChange={onChangeHandler}
				required
			/>
			<TextInput
				variant="filled"
				label="Password"
				type="password"
				name="password"
				onChange={onChangeHandler}
				required
			/>
			<Group className="mt-5 flex gap-3 justify-end flex-row">
				<Button
					type="button"
					color="orange"
					variant="subtle"
					onClick={() => updateFormType('signUp')}
				>
					Sign up
				</Button>
				<Button
					type="submit"
					color="orange"
					variant="outline"
				>
					Sign in
				</Button>
			</Group>
		</>
	);
};

const SignUp = () => {
	const { onChangeHandler, updateFormType } = useAppContext();

	return (
		<>
			<div>
				<Text className="text-[22px] font-thin">Sign Up to get started</Text>
			</div>
			<TextInput
				variant="filled"
				label="Username"
				name="username"
				onChange={onChangeHandler}
				required
			/>
			<TextInput
				variant="filled"
				label="Password"
				type="password"
				name="password"
				onChange={onChangeHandler}
				required
			/>
			<TextInput
				variant="filled"
				label="Email"
				type="email"
				name="email"
				onChange={onChangeHandler}
				required
			/>
			<Group className="mt-5 flex gap-3 justify-end flex-row">
				<Button
					type="button"
					color="orange"
					variant="subtle"
					onClick={() => updateFormType('signIn')}
				>
					Sign In
				</Button>
				<Button
					type="submit"
					color="orange"
					variant="outline"
				>
					Sign Up
				</Button>
			</Group>
		</>
	);
};

const ConfirmSignUp = () => {
	const { onChangeHandler } = useAppContext();

	return (
		<>
			<div>
				<Text className="text-[22px] font-thin">Enter verification code we sent to your email</Text>
			</div>
			<TextInput
				variant="filled"
				label="Verification Code"
				name="authCode"
				onChange={onChangeHandler}
				required
			/>
			<Group className="mt-5 flex gap-3 justify-end flex-row">
				<Button
					type="submit"
					color="orange"
					variant="outline"
				>
					Verify
				</Button>
			</Group>
		</>
	);
};

const Login = () => {
	const { checkSession } = useAppContext();
	const [formState, updateFormState] = useState(initialFormState);

	const { formType } = formState;

	const onChangeHandler = (e: FormEvent<HTMLInputElement>) => {
		e.persist();
		const target = e.target as HTMLInputElement;
		updateFormState(() => ({ ...formState, [target.name]: target.value }));
	};

	const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			switch (formType) {
				case 'signIn':
					signIn()
					break;
				case 'signUp':
					signUp()
					break;
				default:
					confirmSignUp()
					break;
			}
		} catch (error) {
			console.log(error)
		}
	}

	const updateFormType = (formType: string) => {
		updateFormState(() => ({ ...formState, formType }));
	}

	const signUp = async() => {
		const { username, email, password } = formState;
		await Auth.signUp({username, password, attributes: {email}})
		updateFormType('confirmSignUp')
	}
	const confirmSignUp = async() => {
		const { username, authCode } = formState;
		await Auth.confirmSignUp(username, authCode)
		updateFormType('signIn')
	}
	const signIn = async() => {
		const { username, password } = formState;
		await Auth.signIn(username, password)
		checkSession()
	}

	return (
		<>
			<Layout>
				<div className="flex justify-center w-full">
					<Card className="bg-accent max-w-md w-full flex flex-col gap-5 shadow-lg">
						<form onSubmit={onSubmitHandler}>
							<AppContext.Provider value={{ formState, onChangeHandler, updateFormType }}>
								{formType === "signIn" && <SignIn />}
								{formType === "signUp" && <SignUp />}
								{formType === "confirmSignUp" && <ConfirmSignUp />}
							</AppContext.Provider>
						</form>
					</Card>
				</div>
			</Layout>
		</>
	);
};

export default Login;
