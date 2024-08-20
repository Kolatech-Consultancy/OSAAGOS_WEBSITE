import { useEffect, useState } from "react";
import styled from "styled-components";
import AdminForm from "./AdminMediaForm";
import axios from "axios";
import Is_authorized from "../../../utils/authorization";
import toast from "react-hot-toast";

const SearchFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const SearchInput = styled.input`
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 200px;
`;

const FilterSelect = styled.select`
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const Table = styled.table`
  min-width: 100%;
  background-color: white;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
`;

const TableCell = styled.td`
  padding: 16px;
  vertical-align: middle;
`;

const Image = styled.img`
  width: 106px;
  height: 86px;
  border-radius: 8px;
`;

const Iframe = styled.iframe`
  width: 106px;
  height: 86px;
  border-radius: 8px;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const ButtonContainer = styled.div`
  text-align: right;
  white-space: nowrap;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.variant === "delete" ? "#dc3545" : "#007bff"};
  color: white;
  padding: 8px 12px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.variant === "delete" ? "#c82333" : "#0056b3"};
  }
`;

// Pagination styling
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: ${(props) => (props.isActive ? "#007bff" : "#f8f9fa")};
  color: ${(props) => (props.isActive ? "white" : "black")};
  padding: 8px 16px;
  margin: 0 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

function AdminGallery() {
  const [fetching, setFetching] = useState(false);
  const [active, setActive] = useState("gallery");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const itemsPerPage = 3;
  const [media, setMedia] = useState([]);

  const filteredItems = media.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "all" || item.fileType.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  async function deleteItem(id) {
    const Uri = `https://osaagos-api-alumni-website.onrender.com/api/admin/media/:${id}`;
    const token = Is_authorized();

    try {
      // const conf = confirm("Are you sure you want to delete this item");
      // console.log(conf);

      await axios.delete(Uri, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
  }

  function handleEdit(id) {
    setActive("modal");
    setIsEditing(true);
    setEditId(id);
  }
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          "https://osaagos-api-alumni-website.onrender.com/api/media"
        );
        setMedia(response.data);
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

  return (
    <main>
      <nav className="bg-white text-xl flex gap-4 text-center justify-between md:flex-row flex-col rounded-t-lg py-6 px-4">
        <div className="flex gap-4">
          <p
            className={`cursor-pointer px-4 py-2 border rounded-md hover:bg-black hover:text-white transition-all duration-200 ${
              active === "gallery" ? "bg-black text-white" : ""
            }`}
            onClick={(e) => {
              setActive("gallery");
              setEditId("");
              setIsEditing(false);
            }}
          >
            Gallery
          </p>
          <p
            className={`cursor-pointer px-4 py-2 border rounded-md hover:bg-black hover:text-white transition-all duration-200 ${
              active === "modal" ? "bg-black text-white" : ""
            }`}
            onClick={(e) => setActive("modal")}
          >
            Create
          </p>
        </div>

        <SearchFilterContainer>
          <SearchInput
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterSelect
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </FilterSelect>
        </SearchFilterContainer>
      </nav>
      <section className="bg-white p-2 rounded-b-md mt-4 h-full">
        {active === "gallery" && (
          <Table>
            <tbody>
              {currentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.fileType === "image" && (
                      <Image src={item.path} alt={item.title} />
                    )}
                    {item.fileType === "video" && (
                      <Iframe
                        src={item.path}
                        alt={item.title}
                        title="Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Title>{item.title}</Title>
                    <Description>{item.description}</Description>
                  </TableCell>
                  <TableCell>
                    <ButtonContainer>
                      <Button onClick={() => handleEdit(item._id)}>Edit</Button>
                      <Button
                        variant="delete"
                        onClick={() => deleteItem(item._id)}
                      >
                        Delete
                      </Button>
                    </ButtonContainer>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
        {active === "modal" && (
          <div>
            <AdminForm
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editId={editId}
              media={media}
            />
          </div>
        )}
      </section>
      {active === "gallery" && (
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
      )}
    </main>
  );
}

export default AdminGallery;
