import React from "react";
import Image from "next/image";
import { Text, Card } from "@mantine/core";
import { Subscription } from "models/subscription";
import { differenceInDays } from "date-fns";
import { useState, useEffect } from "react";

const SubscriptionCard = ({
	onClick,
	subscription,
}: {
	onClick: (e: React.SyntheticEvent, action?: String, subscription ?: Subscription) => void;
	subscription: Subscription;
}) => {
	const [isDue, setIsDue] = useState<boolean>(false)
	const today = new Date()
	const due = new Date(subscription.remindAt)

	useEffect(() => {
		if(Math.abs(differenceInDays(due, today)) <= 3) {
			setIsDue(true)
		}
	}, [])

	return (
		<>
			<Card
				onClick={(e: React.MouseEvent): void => onClick(e, undefined, subscription)}
				className={`w-full rounded-lg hover:shadow-xl cursor-pointer gap-2 flex flex-col ${isDue ? "bg-red-900 hover:bg-red-800": "bg-accent  hover:bg-[#424a4c]"}`}
			>
				<div className="flex flex-row items-center justify-between">
					<div>
						<Text
							className="text-gray-200 font-bold flex items-center text-[24px]"
							lineClamp={1}
						>
							{subscription.billerName}
							{
								subscription.billerLink &&
								<button
									onClick={(e: React.MouseEvent): void => onClick(e, "link", subscription)}
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
							}
						</Text>
						<Text className="text-gray-400">
							{subscription.planDescription}
						</Text>
					</div>
					<div className="pl-4">
						<Text className="text-[28px] text-[#eba937] font-bold mb-0">
							₱{Number(subscription.recurringAmount).toLocaleString("en-US")}
						</Text>
						<Text className="text-white text-xs text-right">/ month</Text>
					</div>
				</div>
				<div className="flex flex-row items-center justify-between">
					<Text className="text-orange-100 text-sm">
						Next billing:{" "}
						{new Intl.DateTimeFormat("en", {
							month: "long",
							day: "2-digit",
						}).format(new Date(subscription.remindAt))}
					</Text>
					{
						isDue &&
						<button
							onClick={(e: React.MouseEvent): void => onClick(e, "dismiss", subscription)}
							type="button"
							className="w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-1 bg-transparent font-medium text-white hover:bg-primary sm:ml-3 sm:w-auto sm:text-sm"
						>
							Dismiss Notification
						</button>
					}
				</div>
			</Card>
		</>
	);
};

export default SubscriptionCard;
