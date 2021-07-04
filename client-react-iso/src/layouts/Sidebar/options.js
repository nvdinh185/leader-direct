const options = [
  {
    key: "dashboard",
    label: "sidebar.dashboard",
    leftIcon: "ion-clock",
  },
  {
    key: "admin",
    label: "sidebar.adminGroup",
    leftIcon: "ion-person",
    children: [
      {
        key: "admin-menu",
        label: "sidebar.adminMenu",
      },
      {
        key: "admin-user",
        label: "sidebar.adminUser",
      },
      {
        key: "admin-group-user",
        label: "sidebar.adminUserGroup",
      },
      {
        key: "admin-organization",
        label: "sidebar.adminOrganization",
      },
      {
        key: "admin-column-name-map",
        label: "sidebar.adminColumnNameMap",
      },
      {
        key: "admin-category",
        label: "sidebar.adminCategory",
      },
    ],
  },
  {
    key: "scrum-board",
    label: "sidebar.scrumboard",
    leftIcon: "ion-android-calendar",
  },
  {
    key: "pages",
    label: "sidebar.pages",
    leftIcon: "ion-document-text",
    children: [
      {
        key: "404",
        label: "sidebar.404",
        withoutDashboard: true,
      },
      {
        key: "500",
        label: "sidebar.500",
        withoutDashboard: true,
      },
      {
        key: "signin",
        label: "sidebar.signIn",
        withoutDashboard: true,
      },

      {
        key: "forgotpassword",
        label: "sidebar.forgotPw",
        withoutDashboard: true,
      },
      {
        key: "resetpassword",
        label: "sidebar.resetPw",
        withoutDashboard: true,
      },

      // {
      //   key: 'comingSoon',
      //   label: 'sidebar.comingSoon',
      //    withoutDashboard: true
      // }
    ],
  },

  {
    key: "blank-page",
    label: "sidebar.blankPage",
    leftIcon: "ion-document",
  },
];
export default options;
