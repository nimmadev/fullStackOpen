import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import { useDebounce } from "use-debounce";

import { useState } from "react";
import SortPicker, { sortOptions } from "./RepoSort";
import { Searchbar } from "react-native-paper";

const RepositoryList = () => {
  const [sortMethod, setSortMethod] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyword] = useDebounce(searchQuery, 500);
  const { repositories } = useRepositories({
    ...sortOptions[sortMethod],
    searchKeyword: searchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      Header={() => (
        <>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{ border: "2px solid black", marginBottom: 5 }}
          />
          <SortPicker setSortMethod={setSortMethod} sortMethod={sortMethod} />
        </>
      )}
    />
  );
};

export default RepositoryList;
