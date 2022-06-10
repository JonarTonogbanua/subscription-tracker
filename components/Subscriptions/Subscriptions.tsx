import { Text, ActionIcon, Modal, Card, Title } from "@mantine/core";
import Image from "next/image";
import React from "react";
import SubscriptionCard from "./SubscriptionsCard";
import SubscriptionForm from "./SubscriptionsForm";

const SubscriptionsModalHeader = ({readOnly, setReadOnly}: {readOnly: boolean, setReadOnly: (readOnly: boolean) => void}) => {
	return (
		<div className="flex items-center justify-between w-full">
			<Title className="text-white text-[22px] font-medium text-[#eba937]">{ readOnly ? "View" : "Add new" } subscription</Title>
			<button onClick={() => setReadOnly(!readOnly)}>
				{
					readOnly ? <span>Edit</span> : <span>Delete</span>
				}
			</button>
		</div>
	)
}

const Subscriptions = () => {
	const [opened, setOpened] = React.useState<boolean>(false);
	const [readOnly, setReadOnly] = React.useState<boolean>(false);
	const SubscriptionData = Array.from(Array(10).keys());

  const cardClickHandler = (e: React.SyntheticEvent, action?: String): void => {
		e.stopPropagation();
		switch (action) {
			case "link":
				let win = window.open("https://www.netflix.com", "_blank");
				win?.focus();
				break;
			case "dismiss":
				break;

			case "create":
        setOpened(true)
        setReadOnly(false)
				break;

			default:
        setOpened(true)
        setReadOnly(true)
				break;
		}
	};

	return (
		<>
			<div className="relative">
				<div className="flex flex-row justify-between">
					<input
						className="w-full p-2 bg-secondary rounded-md  border border-accent focus:border-white text-white max-w-sm"
						placeholder="Search"
						type="text"
					/>
				</div>
				<div className="mt-10 grid grid-rows-5 grid-flow-col gap-4">
					{SubscriptionData.map((subscription, i) => {
						return <SubscriptionCard key={i} onClick={cardClickHandler}/>;
					})}
					<div className="fixed bottom-5 right-10">
						<button
							onClick={(e: React.MouseEvent): void => cardClickHandler(e, "create")}
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
				onClose={() => setOpened(false)}
				title={<SubscriptionsModalHeader readOnly={readOnly} setReadOnly={setReadOnly} />}
        classNames={{
          modal: 'bg-primary',
					title: 'w-full'
        }}
			>
				<SubscriptionForm readOnly={readOnly} dismiss={ () => setOpened(false) }/>
			</Modal>
		</>
	);
};

export default Subscriptions;
