import React from "react";
import styled from "styled-components";

import { DiReact } from "react-icons/di";

const icon = () => styled(DiReact)`color: #61dbfb;`;

export default {
  register(app: any) {
    app.customFields.register({
      name: "react-icon",
      type: "string",

      icon,
      components: {
        Input: async () =>
          import(/* webpackChunkName: "[request]" */ "./components/Input"),
      },

      intlLabel: {
        id: "react-icons.label",
        defaultMessage: "React Icon",
      },
      intlDescription: {
        id: "react-icons.description",
        defaultMessage: "Pick an icon from the great react-icons library!",
      },

      options: {
        advanced: [
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings",
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "react-icons.required.label",
                  defaultMessage: "Required field",
                },
                description: {
                  id: "react-icons.required.description",
                  defaultMessage:
                    "You won't be able to create an entry if this field is empty",
                },
              },
            ],
          },
        ],
      },
    });
  },

  bootstrap() {},
  async registerTrads() {
    return [];
  },
};
