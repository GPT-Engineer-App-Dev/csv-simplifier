import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const CSVUploader = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\n');
      const headers = lines[0].split(',').map(header => header.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
          obj[header] = values[index] ? values[index].trim() : '';
          return obj;
        }, {});
      }).filter(row => Object.values(row).some(value => value !== ''));

      onFileUpload(data, headers);
      toast.success('CSV file uploaded successfully!');
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload CSV</Button>
    </div>
  );
};

export default CSVUploader;
