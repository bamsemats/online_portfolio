export const data = [
  {
    name: "Home",
    to: "home",
    content: null,
  },
  {
    name: "Apps",
    to: "app1",
    content: [
      {
        name: "App 1",
        content: [
          {
            name: "Location",
            content: [
              {
                name: "City",
                content: null,
              },
            ],
          },
        ],
      },
      {
        name: "App 2",
        to: "app2",
        content: null,
      },
      {
        name: "App 3",
        to: "app3",
        content: null,
      },
      {
        name: "App 4",
        to: "app4",
        content: null,
      },
      {
        name: "App 5",
        to: "app5",
        content: null,
      },
    ],
  },
  {
    name: "Information",
    to: "information",
    content: [
      {
        name: "Background",
        to: "background",
        content: null,
      },
      {
        name: "Contact",
        to: "contact",
        content: [
          {
            name: "LinkedIn",
            to: "linkedin",
            content: null,
          },
          {
            name: "GitHub",
            to: "github",
            content: [
              {
                name: "Random Data",
                content: null,
              },
            ],
          },
        ],
      },
    ],
  },
];
