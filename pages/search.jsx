import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../components/SearchFilters";
import noresult from "../assets/images/noresult.svg";
import Image from "next/image";
import { baseUrl, fetchApi } from "./utils/fetchApi";
import Property from "../components/Property";

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilter] = useState(false);
  const router = useRouter();
  return (
    <Box>
      <Flex
        onClick={() => setSearchFilter(!searchFilters)}
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noresult} />
          <Text fontSize="xl" marginTop="3">
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const filters = {
    purpose: query?.purpose || "for-rent",
    rentFrequency: query?.rentFrequency || "yearly",
    minPrice: query?.minPrice || "0",
    maxPrice: query?.maxPrice || "1000000",
    roomsMin: query?.roomsMin || "0",
    bathsMin: query?.bathsMin || "0",
    sort: query?.sort || "price-desc",
    areaMax: query?.areaMax || "35000",
    locationExternalIDs: query?.locationExternalIDs || "5002",
    categoryExternalID: query?.categoryExternalID || "4",
  };

  const properties = await fetchApi(
    `${baseUrl}/properties/list?${Object.keys(filters)
      .map((key) => `${key}=${filters[key]}`)
      .join("&")}`
  );
  // console.log();

  return {
    props: {
      properties: properties?.hits,
      // properties: [],
    },
  };
}

export default Search;
