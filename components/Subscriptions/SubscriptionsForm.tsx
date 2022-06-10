import React from "react";
import { TextInput, Select, Autocomplete, Button } from "@mantine/core";
import { billers, daysOrdinal } from "./options"
const SubscriptionForm = ({ readOnly = false, dismiss }: { readOnly?: boolean, dismiss: () => void }) => {
	const [edit, setEdit] = React.useState<boolean>(false);

	React.useEffect(() => {
		setEdit(!readOnly);
	}, [readOnly]);

	return (
		<>
			<div className="flex flex-col gap-1">
				<Autocomplete
					readOnly={readOnly || !edit}
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Biller Name"
					placeholder="Netflix, Hulu, Spotify, Apple Music, etc..."
          data={billers}
          required
				/>
				<TextInput
					readOnly={readOnly || !edit}
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Plan Name"
					placeholder="Netflix Premium, Hulu (No Ads), Spotify Premium, etc..."
          required
				/>
				<TextInput
					readOnly={readOnly || !edit}
					className="text-white"
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Website Link"
					placeholder="https://www.netflix.com/YourAccount, etc..."
				/>
        <TextInput
					readOnly={readOnly || !edit}
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Recurring charge amount"
					type="number"
          required
				/>
				<Select
					disabled={readOnly || !edit}
					variant={readOnly || !edit ? "unstyled" : "filled"}
					label="Remind me every"
					data={daysOrdinal}
          required
				/>
				<div className="mt-5 flex justify-end gap-3">
					<Button color="red" variant="light" onClick={dismiss}>Cancel</Button>
					<Button color="orange" variant="outline">Save</Button>
				</div>
			</div>
		</>
	);
};

export default SubscriptionForm;
