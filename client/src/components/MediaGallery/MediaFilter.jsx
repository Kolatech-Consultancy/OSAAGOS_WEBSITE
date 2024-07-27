import styled from "styled-components";

const CenteredFlex = styled.div`
  display: flex;
  justify-content: center;
`;

const Flex = styled.ul`
  display: flex;
  gap: 10px;
`;

function MediaFilter({ filterVal, setFilterVal }) {
  console.log(filterVal);
  const filterLabel = [
    { label: "All" },
    { label: "Video" },
    { label: "Image" },
  ];

  return (
    <CenteredFlex className="flex justify-center w-full border-b-2 border-blue-700 mb-6">
      <Flex>
        {filterLabel.map((el) => {
          console.log(filterVal.toLowerCase() === el.label.toLowerCase());
          return (
            <li
              key={el.label}
              className={`py-4 px-8  cursor-pointer ${
                filterVal.toLowerCase() === el.label.toLowerCase()
                  ? "bg-blue-700 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setFilterVal(el.label.toLowerCase())}
            >
              {el.label}
            </li>
          );
        })}
      </Flex>
    </CenteredFlex>
  );
}

export default MediaFilter;
