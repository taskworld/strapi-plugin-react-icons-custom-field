import React, { useMemo } from "react";

import styled from "styled-components";

import { Flex, Loader, Typography } from "@strapi/design-system";

// @ts-expect-error
import { IconsManifest } from "react-icons";

import useIconSet from "../hooks/useIconSet";

import IconButton from "./IconButton";

type IconCollectionProps = {
  id: string;
  value: string;
  filter: string;
  withTitle?: boolean;
  onChange: (newVal: string) => void;
};

type IconManifest = {
  id: string;
  name: string;
};

export default function IconCollection({
  id,
  value,
  filter,
  withTitle,
  onChange,
}: IconCollectionProps) {
  const name =
    (IconsManifest as IconManifest[]).find((manifest) => manifest.id === id)
      ?.name ?? "Unknown";

  const { loading, iconSet } = useIconSet(id);

  const filteredIconSet = useMemo(
    () => iconSet.filter(([key]) => key.toLowerCase().includes(filter)),
    [filter, iconSet]
  );

  return (
    <Flex direction="column" gap={2} alignItems="start">
      {withTitle && (
        <Flex gap={2}>
          <Typography fontWeight="bold">{name}</Typography>
          <Typography>
            ({filteredIconSet.length}/{iconSet.length})
          </Typography>
        </Flex>
      )}
      <Flex gap={2} wrap="wrap">
        {loading ? (
          <Loader />
        ) : (
          filteredIconSet.map(([icon, Icon]) => (
            <IconButton
              key={icon}
              label={icon}
              icon={<Icon />}
              size="L"
              variant={value === icon ? "secondary" : "tertiary"}
              onClick={() => onChange(icon)}
            />
          ))
        )}
      </Flex>
    </Flex>
  );
}
