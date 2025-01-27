import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserData = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const rowsPerPage = 2;

    useEffect(() => {
        const apiUrl = "https://dummyapi.io/data/v1/user";
        const headers = {
            "app-id": "64fc4a747b1786417e354f31",
        };
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, { headers });
                console.log(response.data);
                setData(response.data.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter data based on search term
    const filteredData = data.filter((row) =>
        row.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (id) => {
        try {
            const headers = {
                "app-id": "64fc4a747b1786417e354f31",
            };
            const response = await axios.delete(`https://dummyapi.io/data/v1/user/${id}`, { headers });
            console.log("User deleted:", response.data);

            setData((prevData) => prevData.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleUpdate = (user) => {
        navigate(`/user/update`, { state: { user } });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-1/2 border-2 border-white rounded-lg px-20 py-10 relative min-h-[450px]">

                {/* Search Bar */}
                <div className="text-center w-full p-2">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full bg-amber-50 rounded-full p-3"
                    />
                </div>

                {/* Navigation Button */}
                <div className="text-right m-4">
                    <button
                        onClick={() => navigate("/user/form")} // Navigate to the "form" route
                        className=" bg-blue-500 p-4 rounded-full hover:bg-blue-600 text-white duration-300"
                    >
                        <i className="fa-solid fa-plus"></i>
                        <span className="ml-2">Add new contact</span>
                    </button>
                </div>

                {/* Table */}
                <table className="w-full p-4 m-4 table-fixed text-white">
                    <tbody className="flex flex-col">
                        {paginatedData.map((row, index) => (
                            <tr key={row.id} className={`flex justify-between gap-4 p-4 ${index !== paginatedData.length - 1 ? 'border-b-2 border-white' : ''}`} >
                                <td className="flex items-center">
                                    <div className="flex-shrink-0 mr-4">
                                        <img src={row.picture} width={75} className="rounded-full h-full" />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <span >{
                                            row.firstName}
                                        </span>
                                        <span>
                                            {row.lastName}
                                        </span>
                                    </div>
                                </td>

                                <td className="flex items-center">
                                    {/* Edit Button */}
                                    <button
                                        onClick={() => handleUpdate(row)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white duration-300 w-12 h-12 rounded-full flex items-center justify-center mr-3">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(row.id)} // Pass the user ID to the delete function
                                        className="bg-red-500 hover:bg-red-600 text-white duration-300 w-12 h-12 rounded-full flex items-center justify-center" >

                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="absolute bottom-4 right-4 text-white">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ marginRight: "10px", padding: "5px 10px" }}
                    >
                        <i className="fa-solid fa-angle-left"></i>
                    </button>
                    <span>
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ marginLeft: "10px", padding: "5px 10px" }}
                    >
                        <i className="fa-solid fa-angle-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserData;