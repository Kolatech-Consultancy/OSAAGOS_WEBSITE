import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Spinner from "../components/Spinner";
import UserList from "./UserList";
import { useLoginUser } from "../components/context/LoginUserContext";

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;
export const SearchFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

export const SearchInput = styled.input`
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: ${(props) => (props.variant === "big" ? "100%" : "200px")};
  @media (max-width: 768px) {
    width: 100%;
  }
  margin: 0 1rem;
`;
export const ProfilePicture = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 16px;
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 12px;
  }
`;

export const UserInfo = styled.div`
  flex-grow: 1;
`;

export const FullName = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

export const MessageButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    margin-top: 12px;
  }
`;

const UserCardContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  padding: 10px;

  @media (max-width: 580px) {
    padding: 5px;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0 10px;

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

export const PageButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  padding: 6px 12px;
  margin: 2px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 14px;

  &:hover {
    background-color: #0056b3;
    color: white;
  }

  @media (max-width: 480px) {
    padding: 4px 10px;
    font-size: 12px;
  }
`;

function UserChat() {
  const { allUser, isFetchingUser: fetching } = useLoginUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 4;
  const [users, setUsers] = useState([]);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const filteredItems = users.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUsers(allUser);
      } catch (error) {
        toast.error(
          error.response ? error.response.data.message : error.message
        );
      }
    };
    fetchData();
  }, [allUser]);

  if (fetching) <Spinner />;

  return (
    <section className="max-w-5xl mx-auto px-4">
      {/* <div className="max-w-2xl w-full mx-auto my-4 px-4"> */}
      <SearchFilterContainer>
        <SearchInput
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="big"
        />
      </SearchFilterContainer>
      {/* </div> */}
      {/* <div className="max-w-5xl mx-auto px-4"> */}
      {fetching ? (
        <Spinner />
      ) : (
        <UserCardContainer>
          {currentItems.map((user) => (
            <UserList key={user._id} user={user} />
          ))}
        </UserCardContainer>
      )}
      {/* </div> */}

      <PaginationContainer>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageButton
            key={index + 1}
            onClick={() => handleClick(index + 1)}
            isActive={currentPage === index + 1}
          >
            {index + 1}
          </PageButton>
        ))}
      </PaginationContainer>
    </section>
  );
}

export default UserChat;
