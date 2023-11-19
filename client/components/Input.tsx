import React, { useEffect, useState } from "react";

import { useIntl, MessageDescriptor } from "react-intl";

import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  Loader,
  ModalLayout,
  ModalHeader,
  ModalBody,
  Searchbar,
  SearchForm,
  Stack,
} from "@strapi/design-system";

import IconCollection from "./IconCollection";
import IconButton from "./IconButton";

import { useApi } from "../hooks/useApi";
import { useIcon } from "../hooks/useIcon";

import pluginId from '../../pluginId.json'

type InputProps = {
  name: string;
  value: string;
  error: string;
  description?: MessageDescriptor;
  intlLabel: MessageDescriptor;
  placeholder?: string;
  required: boolean;

  onChange: (payload: {
    target: { name: string; type: "string"; value: string };
  }) => void;
};

export default function Input({
  name,
  value,
  error,
  description,
  intlLabel,
  required,
  onChange,
}: InputProps) {
  const { formatMessage } = useIntl();
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("");

  const config = useApi(`/${pluginId}`);

  const SelectedIcon = useIcon(value);
  const iconSets: string[] = config.data?.pack ?? ["lu"];

  function handleChange(value) {
    onChange({ target: { type: "string", name, value } });
    setModal(false);
  }

  return (
    <>
      <Field
        name={name}
        id={name}
        error={error}
        hint={description && formatMessage(description!)}
      >
        <Stack spacing={2}>
          <FieldLabel required={required}>
            {formatMessage(intlLabel)}
          </FieldLabel>
          <Stack horizontal spacing={2}>
            <IconButton
              label={value ?? ""}
              icon={<SelectedIcon />}
              onClick={() => setModal(true)}
            />
          </Stack>

          <FieldHint />
          <FieldError />
        </Stack>
      </Field>

      {modal && (
        <ModalLayout onClose={() => setModal(false)}>
          <ModalHeader>
            <SearchForm>
              <Searchbar
                onClear={() => setFilter("")}
                value={filter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFilter(e.target.value)
                }
              />
            </SearchForm>
          </ModalHeader>
          <ModalBody style={{ height: "100vh" }}>
            {config.loading ? (
              <Loader />
            ) : (
              iconSets.map((id) => (
                <IconCollection
                  key={id}
                  id={id}
                  value={value}
                  filter={filter}
                  withTitle={iconSets.length > 1}
                  onChange={handleChange}
                />
              ))
            )}
          </ModalBody>
        </ModalLayout>
      )}
    </>
  );
}
