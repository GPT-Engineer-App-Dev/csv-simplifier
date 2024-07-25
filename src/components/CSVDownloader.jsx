import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const CSVDownloader = ({ data, headers }) => {
  const handleDownload = () => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'edited_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Button onClick={handleDownload}>
      <Download className="h-4 w-4 mr-2" /> Download CSV
    </Button>
  );
};

export default CSVDownloader;
