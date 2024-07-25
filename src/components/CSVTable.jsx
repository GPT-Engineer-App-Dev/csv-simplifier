import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

const CSVTable = ({ data, headers, onDataChange }) => {
  const [editableData, setEditableData] = useState(data);

  const handleCellChange = (rowIndex, header, value) => {
    const newData = [...editableData];
    newData[rowIndex][header] = value;
    setEditableData(newData);
    onDataChange(newData);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce((obj, header) => {
      obj[header] = '';
      return obj;
    }, {});
    setEditableData([...editableData, newRow]);
    onDataChange([...editableData, newRow]);
  };

  const handleDeleteRow = (rowIndex) => {
    const newData = editableData.filter((_, index) => index !== rowIndex);
    setEditableData(newData);
    onDataChange(newData);
  };

  return (
    <div className="mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => (
                <TableCell key={`${rowIndex}-${header}`}>
                  <Input
                    value={row[header]}
                    onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                  />
                </TableCell>
              ))}
              <TableCell>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteRow(rowIndex)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAddRow} className="mt-4">
        <Plus className="h-4 w-4 mr-2" /> Add Row
      </Button>
    </div>
  );
};

export default CSVTable;
