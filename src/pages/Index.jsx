import { useState } from 'react';
import CSVUploader from '../components/CSVUploader';
import CSVTable from '../components/CSVTable';
import CSVDownloader from '../components/CSVDownloader';

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (data, headers) => {
    setCsvData(data);
    setHeaders(headers);
  };

  const handleDataChange = (newData) => {
    setCsvData(newData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CSV Editor</h1>
      <CSVUploader onFileUpload={handleFileUpload} />
      {csvData.length > 0 && (
        <>
          <CSVTable data={csvData} headers={headers} onDataChange={handleDataChange} />
          <CSVDownloader data={csvData} headers={headers} />
        </>
      )}
    </div>
  );
};

export default Index;
