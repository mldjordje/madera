import React from "react";

import AppData from "@data/app.json";
import AdminPanel from "./panel";

export const metadata = {
  title: {
    default: "Admin",
  },
  description: AppData.settings.siteDescription,
};

const AdminPage = () => {
  return <AdminPanel />;
};

export default AdminPage;

