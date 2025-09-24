import expCSV from "./expCSV";
import expPDF from "./expPDF";
import expEXCEL from "./expEXCEL";

const TestComponent = () => {
  const users = [
    {
      name: "Alice Johnson",
      role: "Developer",
      email: "alice@example.com",
      tasks: [
        {
          title: "Fix bug #123",
          date: "2025-09-10T12:00:00Z",
          due: "2025-09-12T12:00:00Z",
          stage: "completed",
        },
        {
          title: "Implement feature X",
          date: "2025-09-15T12:00:00Z",
          due: "2025-09-20T12:00:00Z",
          stage: "pending",
        },
      ],
    },
    {
      name: "Bob Smith",
      role: "Manager",
      email: "bob@example.com",
      tasks: [
        {
          title: "Prepare report",
          date: "2025-09-05T12:00:00Z",
          due: "2025-09-07T12:00:00Z",
          stage: "completed",
        },
      ],
    },
  ];

  const handlePDF = () => {
    expPDF({ users }); // call directly
  };

  const handleCSV = () => {
    expCSV({ users });
  };

  const handleExcel = () => {
    expEXCEL({ users });
  };

  return (
    <div className="p-4 space-x-3">
      <button
        onClick={handlePDF}
        className="bg-red-500 text-white px-3 py-2 rounded"
      >
        Export PDF
      </button>
      <button
        onClick={handleCSV}
        className="bg-blue-500 text-white px-3 py-2 rounded"
      >
        Export CSV
      </button>
      <button
        onClick={handleExcel}
        className="bg-green-500 text-white px-3 py-2 rounded"
      >
        Export Excel
      </button>
    </div>
  );
};

export default TestComponent;
