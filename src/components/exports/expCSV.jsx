/* eslint-disable no-unused-vars */
import Papa from "papaparse";

const expCSV = ({ users }) => {
  const generateCSV = () => {
    let rows = [];

    users.forEach((user) => {
      rows.push({
        ID: user._id,
        Name: user.name,
        Email: user.email,
        Status: user.isActive ? "Active" : "Inactive",
      });
    });

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return generateCSV();
};

export default expCSV;
