import axios from "../utils/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import Spinner from "../components/Spinner";
import Is_authorized from "../utils/authorization";
import {
  PageButton,
  PaginationContainer,
  SearchFilterContainer,
  SearchInput,
} from "../components/AdminDashboard/Gallery/AdminGallery";
import UserList from "./UserList";

// Styled components
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
`;

function UserChat() {
  const [fetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 4;

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [users, setUsers] = useState([]);

  const filteredItems = users.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const response = await axios.get("/api/users/allUsers");
        setUsers(response.data);
        console.log(response.data);
        setFetching(false);
      } catch (error) {
        toast.error(
          error.response ? error.response.data.message : error.message
        );
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  if (fetching) <Spinner />;

  return (
    <>
      <div className="max-w-2xl mx-auto my-4">
        <SearchFilterContainer>
          <SearchInput
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="big"
          />
        </SearchFilterContainer>
      </div>
      <div className="max-w-5xl mx-auto">
        {fetching ? (
          <Spinner />
        ) : (
          <UserCardContainer>
            {currentItems.map((user) => (
              <UserList key={user._id} user={user} />
            ))}
          </UserCardContainer>
        )}
      </div>
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
    </>
  );
}

export default UserChat;
