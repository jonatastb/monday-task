import React, { useState } from "react";
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

      <Heading type={Heading.types.H2} weight={Heading.weights.NORMAL} align="center">
        Weather in countries
      </Heading>

      <div style={{width: '50%', margin: '1rem auto'}}>
        <Search value={search} onChange={handleSearchChange} size="medium" placeholder="Search your country here"/>
      </div>

      <TableComponent search={search}/>

    </div>
  );
}

export default App;
