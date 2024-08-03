// import React, { useEffect, useState } from 'react'

// const filteredData = ({query}) => {
//     const [searchQuery, setSearchQuery] = useState(query);

//     useEffect(() => {
//         setSearchQuery(query);
//       }, [query]);
    
//       useEffect(() => {
//         console.log("Search query:", searchQuery);
//       }, [searchQuery]);


//   return (
//     <div>
//       Filtered data: {query}
//     </div>
//   )
// }

// export default filteredData;

import React, { useEffect, useState } from 'react';

const FilteredData = ({ query }) => {
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    console.log("Search query:", searchQuery);
  }, [searchQuery]);

  return (
    <div>
      Filtered data: render {searchQuery}
    </div>
  );
};

export default FilteredData;
