import { useEffect, useState, FormEvent } from "react";
import { TextInput, NativeSelect, LoadingOverlay, Button } from "@mantine/core";
import { billers, daysOrdinal } from "./options";
import { Subscription } from "models/subscription";
import axios from "axios";
import { API_URL } from "constants/url";
import { useAppContext, AppContext } from "@context/ContextProvider";
import { useForm } from "@mantine/form";
import useSWR, { useSWRConfig } from "swr";

const initialValues = {
	billerLink: "",
	billerName: "",
	planDescription: "",
	recurringAmount: 0,
	recurringEvery: 0,
};

const SubscriptionForm = ({
	readOnly = false,
	dismiss,
	subscription,
}: {
	readOnly?: boolean;
	dismiss: () => void;
	subscription?: Subscription;
}) => {
	const { setBusy, busy, edit, setEdit, setOpened } = useAppContext();
	const { mutate } = useSWRConfig();
	
	const form = useForm({
		initialValues,
	});
	const onSubmitHandler = async (values: FormValues) => {
		const options = { optimisticData: subscription, rollbackOnError: true }
		setBusy(true);
		try {
			mutate(`${API_URL}/subscriptions`, async () => {
				const result = await axios.post(`${API_URL}/subscriptions`, {
					...values,
				});

				return result;
			}, options);

			setOpened(false);
		} catch (error) {
		} finally {
			setBusy(false);
		}
	};

	useEffect(() => {
		setEdit(!readOnly);
	}, [readOnly]);

	useEffect(() => {
		if(subscription) {
			const {
				billerLink,
				billerName,
				planDescription,
				recurringAmount,
				recurringEvery,
			} = subscription as Subscription;
	
			form.setValues({
				billerLink,
				billerName,
				planDescription,
				recurringAmount,
				recurringEvery,
			});
		}
	}, [subscription]);

	type FormValues = typeof form.values;

	return (
		<>
			<form className="flex flex-col gap-1" onSubmit={form.onSubmit((values : FormValues) => onSubmitHandler(values))} >
				<LoadingOverlay visible={busy} />
				<TextInput
					readOnly={readOnly || !edit}
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Biller Name"
					name="billerName"
					{...form.getInputProps("billerName")}
					required
				/>
				<TextInput
					readOnly={readOnly || !edit}
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Plan Name"
					name="planDescription"
					{...form.getInputProps("planDescription")}
					required
				/>
				<TextInput
					readOnly={readOnly || !edit}
					className="text-white"
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Website Link"
					name="billerLink"
					{...form.getInputProps("billerLink")}
					type="url"
				/>
				<TextInput
					readOnly={readOnly || !edit}
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Recurring charge amount"
					type="number"
					name="recurringAmount"
					{...form.getInputProps("recurringAmount", {type: 'number'})}
					required
				/>
				<NativeSelect
					disabled={readOnly || !edit}
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Remind me every"
					data={daysOrdinal}
					name="recurringEvery"
					{...form.getInputProps("recurringEvery")}
					required
				/>
				<div className="mt-5 flex justify-end gap-3">
					<Button type="button" color="red" variant="light" onClick={dismiss}>
						Close
					</Button>
					<Button type="submit" color="orange" variant="outline">
						Save
					</Button>
				</div>
			</form>
		</>
	);
};

export default SubscriptionForm;
