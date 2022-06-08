import Cards from "@components/Cards";
import Modal from "@components/Modal";
import Image from "next/image";

const Subscriptions = () => {
	const SubscriptionData = Array.from(Array(10).keys());

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
						return (
							<Cards
								key={i}
								className="hover:shadow-xl hover:bg-[#424a4c] cursor-pointer"
							>
								<div className="flex flex-row items-center justify-between">
									<div>
										<h3 className="text-gray-200 font-bold flex items-center">
											Netflix
											<a className="flex items-center ml-5 rounded-full hover:bg-accent p-1">
												<Image
													src="/assets/images/link-out.svg"
													alt="link-out"
													height={24}
													width={24}
												/>
											</a>
										</h3>
										<h5 className="text-gray-400">Family Plan - 4 Devices</h5>
										<div className="text-white text-sm">
											Next billing: July 30
										</div>
									</div>
									<div className="pl-4">
										<div className="text-[28px] text-[#eba937] font-bold">
											$5.00
										</div>
										<div className="text-white text-xs text-right">
											{" "}
											/ month
										</div>
									</div>
								</div>
								<div className="flex flex-row items-center justify-end">
									<button
										type="button"
										className="w-full inline-flex justify-center rounded-md border border-gray-500 shadow-sm px-4 py-1 bg-transparent font-medium text-white hover:bg-primary sm:ml-3 sm:w-auto sm:text-sm"
									>
										Mark as Renewed
									</button>
								</div>
							</Cards>
						);
					})}
					{/* <Modal /> */}
				</div>
			</div>
		</>
	);
};

export default Subscriptions;
