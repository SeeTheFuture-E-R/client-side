
import fetch from "node-fetch";

const makeGet = (domain: string, jwt: string) => async (path: string) => {
    const res = await fetch(`${domain}${path}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
    });
    if (!res.ok) return res;
    return res.json();
};

const makePost =
    (domain: string, jwt: string) => async (path: string, body: any) => {
        const res = await fetch(`${domain}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) return res;
        return res.json();
    };

const makePut =
    (domain: string, jwt: string) => async (path: string, body: any) => {
        const res = await fetch(`${domain}${path}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) return res;
        return res.json();
    };

const makeDelete =
    (domain: string, jwt: string) => async (path: string, body: any) => {
        const res = await fetch(`${domain}${path}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) return res;
        return res.json();
    };
    
export { makeGet, makePost, makeDelete, makePut };























import React from "react";
//@ts-ignore
import parser from "parse-address";
import { type ParsedAddress } from "types";
import { TextField } from "@material-ui/core";
import { useFormik, FormikValues } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { put } from "../../../../../../utils/fetch";
import { message } from "../../../../../ui-tailwind";
import { SubmitPanel } from "../../../../../ui-tailwind";
import { logError } from "../../../../../../utils/logger";
import { Referral } from "../../../../../../types/Referral";
const getAddressString = (address?: ParsedAddress) => {
    const { number, prefix, type, street } = address || {};
    return [number, prefix, street, type].join(" ");
};
export default ({ referral, setIsEditing }: { referral: Referral; setIsEditing: (edit: boolean) => void }) => {
    const queryClient = useQueryClient();
    const { id: residentId, address } = referral.resident || {};
    const { city, state, zip } = address || {};
    const path = `/facility/${referral.facility.id}`;
    const residentMutation = useMutation(({ address }: FormikValues) =>
        put(`${path}/residents/${residentId}`, { address })
    );
    const onSubmit = async (values: FormikValues) => {
        const parsedAddress = parser.parseLocation(`${values.address}`);
        try {
            await residentMutation.mutateAsync({
                address: {
                    ...parsedAddress,
                    zip: values.zip,
                    city: values.city,
                    state: values.state,
                },
            });
            await queryClient.refetchQueries(`${path}/referrals/${referral.id}`);
            message.success("Saved Successfully");
            setIsEditing(false);
        } catch (error) {
            message.error("An error has occurred. Please try again");
            logError(error);
        }
    };
    const { handleSubmit, getFieldProps, isSubmitting, dirty } = useFormik({
        onSubmit,
        initialValues: { city, state, zip, address: getAddressString(address) },
    });
    return (
        <form className="flex justify-center w-full" onSubmit={handleSubmit}>
            <div className="flex justify-end gap-2 mobileP:flex mobileP:flex-wrap tablet:grid tablet:grid-cols-2">
                <TextField label="Address" fullWidth {...getFieldProps("address")} />
                <TextField label="City" fullWidth {...getFieldProps("city")} />
                <TextField label="State" fullWidth {...getFieldProps("state")} />
                <TextField label="Zipcode" fullWidth {...getFieldProps("zip")} />
                <SubmitPanel dirty={dirty} disabled={isSubmitting} onCancelClick={setIsEditing} />
                {/* <div className="flex justify-end w-full col-span-2 gap-2.5">
<Button size="small" color="secondary" onClick={() => onCancelClick(false)} disabled={disabled}>
Cancel
</Button>
<Button size="small" type="submit" disabled={disabled || !dirty}>
Save
</Button>
</div> */}
            </div>
        </form>
    );
};
