type TTableData = {
  td: string | number;
  cls?: string;
};
const TableData = ({ td, cls }: TTableData) => {
  return (
    <td className={`border p-2 text-center whitespace-nowrap ${cls || ""}`}>
      {td}
    </td>
  );
};

export default TableData;
