import styled from "styled-components";

import { IconButton } from "@strapi/design-system";

export default styled(IconButton)`
& {
  z-index: 0;
  position: relative;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.neutral400};
}

&:hover {
  z-index: 1;
  scale: 1.6;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.primary700} !important;
}
`;
