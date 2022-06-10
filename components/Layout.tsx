import { ReactNode } from "react";
import { Button, Container, Text } from "@mantine/core";
import { useAppContext } from "@context/ContextProvider";

const Layout = ({ children }: { children: ReactNode }) => {
	const { user, logout } = useAppContext();

	return (
		<>
			<div className="min-h-screen w-screen relative">
				<div className="bg-secondary h-[180px] flex items-center">
					<Container className="text-white w-full flex justify-between items-center">
						<Text className="text-[28px] h-full py-5">
							Subscription Tracker
						</Text>
            {
              user && <Button color="orange" onClick={logout}>Logout</Button>
            }
					</Container>
				</div>
				<div>
					<Container className="flex flex-col gap-10 pb-[150px] -mt-[50px]">
						{children}
					</Container>
				</div>
			</div>
		</>
	);
};

export default Layout;
