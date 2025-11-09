type TTableHead = {
  th: string | number;
  cls?: string;
};
const TableHead = ({ th, cls }: TTableHead) => {
  return <th className={`p-2 border ${cls}`}>{th}</th>;
};

export default TableHead;
