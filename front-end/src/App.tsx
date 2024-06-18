import { useState } from "react";
import { Search } from "monday-ui-react-core";
import { Heading } from "monday-ui-react-core/next";
import TableComponent from "./components/Table";

function App() {
  const [search, setSearch] = useState<string>('');


  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return (
    <div>
      <h1 style={{fontWeight: '500', fontFamily: 'sans-serif', textAlign: 'center'}}>
        Weather in countries
      </h1>

      <div style={{ width: '50%', margin: '1rem auto' }}>
        <Search value={search} onChange={handleSearchChange} size="medium" placeholder="Search your country here" />
      </div>

      <TableComponent search={search} />
    </div>
  );
}

export default App;
