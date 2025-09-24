/* eslint-disable no-unused-vars */
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

const expPDF = ({ users }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("User Report", 14, 22);

    const headers = [["ID", "Name", "Email", "Status"]];
    const body = users.map((user) => [
      user._id,
      user.name,
      user.email,
      user.isActive ? "Active" : "Inactive",
    ]);

    autoTable(doc, {
      head: headers,
      body: body,
      startY: 30,
    });

    doc.save("users_report.pdf");
  };

  return generatePDF();
};

export default expPDF;
