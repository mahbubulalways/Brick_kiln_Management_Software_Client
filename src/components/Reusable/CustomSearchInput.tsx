import { Dispatch, SetStateAction } from "react";

type TSearchInput = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};
const CustomSearchInput = ({ search, setSearch }: TSearchInput) => {
  return (
    <input
      type="text"
      placeholder="সার্চ করুন..."
      className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-1 focus:ring-green-400 "
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default CustomSearchInput;
