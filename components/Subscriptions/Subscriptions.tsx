import { Button, Modal, Title } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
import SubscriptionCard from "./SubscriptionsCard";
import SubscriptionForm from "./SubscriptionsForm";
import { useAppContext, AppContext } from "@context/ContextProvider";
import { API_URL } from "constants/url";
import { Subscription } from "models/subscription";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";

const SubscriptionsModalHeader = ({
	subscription,
}: {
	subscription ?: Subscription;
}) => {
	const { readOnly, setReadOnly, edit } = useAppContext();
	return (
		<div className="flex items-center justify-between w-full">
			<Title className="text-white text-[22px] font-medium text-[#eba937]">
				{readOnly ? "View" : subscription ? "Edit": "Add new"} subscription
			</Title>
			{subscription && !edit && (
				<Button variant="subtle" color="orange" onClick={() => setReadOnly(!readOnly)}>Edit</Button>
			)}
		</div>
	);
};

const Subscriptions = () => {
	const { user } = useAppContext();
	const [opened, setOpened] = React.useState<boolean>(false);
	const [edit, setEdit] = React.useState<boolean>(false);
	const [readOnly, setReadOnly] = React.useState<boolean>(false);
	const [busy, setBusy] = React.useState<boolean>(false);

	const [queryString, setQueryString] = React.useState<string>("");
	const [selectedSubscription, setSelectedSubscription] =
		React.useState<Subscription | undefined>(undefined);

	const { mutate } = useSWRConfig();
	const { data, error } = useSWR(`${API_URL}/subscriptions`, (url: string) =>
		fetch(url).then((r) => r.json())
	);
	const SubscriptionData = data?.body ?? [];

	const markSubscriptionRenew = async (subscription: Subscription) => {
		const response = await axios.put(
			`${API_URL}/subscriptions/${subscription?.billerId}/renew`
		);
		return response;
	};

	const cardClickHandler = async (
		e: React.SyntheticEvent,
		action?: String,
		subscription?: Subscription
	): void => {
		e.stopPropagation();
		switch (action) {
			case "link":
				if (subscription?.billerLink) {
					let win = window.open(subscription.billerLink, "_blank");
					win?.focus();
				}
				break;
			case "dismiss":
				const options = { optimisticData: subscription, rollbackOnError: true };
				mutate(
					`${API_URL}/subscriptions`,
					markSubscriptionRenew(subscription as Subscription),
					options
				);
				break;

			case "create":
				setOpened(true);
				setReadOnly(false);
				setSelectedSubscription(undefined);
				break;

			default:
				setOpened(true);
				setReadOnly(true);
				setSelectedSubscription(subscription);
				break;
		}
	};

	if (data?.body) {
		return (
			<AppContext.Provider
				value={{
					busy,
					setBusy,
					opened,
					setOpened,
					edit,
					setEdit,
					readOnly,
					setReadOnly,
				}}
			>
				<div className="relative">
					<div className="flex flex-row justify-between">
						<input
							className="w-full p-2 bg-secondary rounded-md  border border-accent focus:border-white text-white max-w-sm"
							placeholder="Search"
							type="text"
							value={queryString}
							onChange={(event) => setQueryString(event.currentTarget.value)}
						/>
					</div>
					<div className="mt-10 grid grid-flow-row grid-cols-2 gap-4">
						{SubscriptionData.map((subscription: Subscription, i: number) => {
							return (
								<SubscriptionCard
									key={subscription.billerId}
									subscription={subscription}
									onClick={cardClickHandler}
								/>
							);
						})}
						<div className="fixed bottom-5 right-10">
							<button
								onClick={(e: React.MouseEvent): void =>
									cardClickHandler(e, "create")
								}
								className="px-4 py-4 bg-[#1e1e1e] hover:shadow-2xl flex justify-center items-center rounded-full"
							>
								<Image
									className="pointer-events-none"
									src="/assets/images/plus-icon.svg"
									alt="link-out"
									height={48}
									width={48}
								/>
							</button>
						</div>
					</div>
				</div>
				<Modal
					centered
					opened={opened}
					withCloseButton={false}
					size="sm"
					onClose={() => {
						setOpened(false);
						setSelectedSubscription(null);
					}}
					title={
						<SubscriptionsModalHeader subscription={selectedSubscription} />
					}
					closeOnClickOutside={!busy}
					classNames={{
						modal: "bg-primary",
						title: "w-full",
					}}
				>
					<SubscriptionForm
						readOnly={readOnly}
						dismiss={() => setOpened(false)}
						subscription={selectedSubscription}
					/>
				</Modal>
			</AppContext.Provider>
		);
	} else {
		return <>Loading...</>;
	}
};

export default Subscriptions;
