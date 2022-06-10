import React from "react";
import Image from "next/image";
import { Text, Card } from "@mantine/core";


const SubscriptionCard = ({
	onClick,
}: {
	onClick: (e: React.SyntheticEvent, action?: String) => void;
}) => {
	return (
		<>
			<Card
				onClick={(e: React.MouseEvent): void => onClick(e)}
				className="w-full bg-accent rounded-lg hover:shadow-xl hover:bg-[#424a4c] cursor-pointer gap-2 flex flex-col"
			>
				<div className="flex flex-row items-center justify-between">
					<div>
						<Text
							className="text-gray-200 font-bold flex items-center text-[24px]"
							lineClamp={1}
						>
							Netflix
							<button
								onClick={(e: React.MouseEvent): void => onClick(e, "link")}
								className="flex items-center ml-5 rounded-full hover:bg-accent p-1"
							>
								<Image
									className="pointer-events-none"
									src="/assets/images/link-out.svg"
									alt="link-out"
									height={24}
									width={24}
								/>
							</button>
						</Text>
						<Text className="text-gray-400">Family Plan - 4 Devices</Text>
					</div>
					<div className="pl-4">
						<Text className="text-[28px] text-[#eba937] font-bold mb-0">
							$5.00
						</Text>
						<Text className="text-white text-xs text-right">/ month</Text>
					</div>
				</div>
				<div className="flex flex-row items-center justify-between">
					<Text className="text-orange-100 text-sm">Next billing: July 30</Text>
					<button
						onClick={(e: React.MouseEvent): void => onClick(e, "dismiss")}
						type="button"
						className="w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-1 bg-transparent font-medium text-white hover:bg-primary sm:ml-3 sm:w-auto sm:text-sm"
					>
						Dismiss Notification
					</button>
				</div>
			</Card>
		</>
	);
};

export default SubscriptionCard;
