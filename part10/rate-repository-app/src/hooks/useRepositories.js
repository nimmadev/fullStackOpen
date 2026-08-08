import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";
// import { useState, useEffect } from "react";

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);

//     // Replace the IP address part with your own IP address!
//     const response = await fetch("http://192.168.1.16:5000/api/repositories");
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

const useRepositories = (sort) => {
  const {
    data: repositories,
    loading,
    refetch,
  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: sort,
  });

  if (loading) return { loading };
  return { repositories: repositories.repositories, loading, refetch };
};

export default useRepositories;
