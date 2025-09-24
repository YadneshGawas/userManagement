/* eslint-disable no-unused-vars */
import * as XLSX from "xlsx";

const expEXCEL = ({ users }) => {
  const generateExcel = () => {
    let rows = [];

    users.forEach((user) => {
      rows.push({
        ID: user._id,
        Name: user.name,
        Email: user.email,
        Status: user.isActive ? "Active" : "Inactive",
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Report");

    XLSX.writeFile(workbook, "users_report.xlsx");
  };

  return generateExcel();
};

export default expEXCEL;
