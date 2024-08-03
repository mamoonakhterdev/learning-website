import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  styled,
  Typography,
  Button,
  TextField,
  MenuItem,
  Grid,
  CircularProgress,
  TablePagination,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import { Delete, CloudDownload } from "@mui/icons-material";
import { get, ref, remove } from "firebase/database";
import { database } from "../../../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Component = styled(Box)`
  width: 80%;
  margin: 50px auto;
  overflow: hidden;

  & > h4 {
    margin-bottom: 20px;
    font-size: 1.5vw;
    @media (max-width: 600px) {
      font-size: 1.2vw;
    }
  }

  & > div > table {
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
    @media (max-width: 600px) {
      font-size: 0.875vw;
    }
  }

  & > div > table > thead {
    background: #000;
    color: #fff;
    display: block;
    width: 100%;
  }

  & > div > table > thead > tr {
    display: flex;
    flex-wrap: nowrap;
    color: #fff;
    width: 100%;
  }

  & > div > table > thead > tr > th {
    flex: 1;
    padding: 1vw;
    font-size: 0.8vw;
    color: #fff;
    box-sizing: border-box;
    @media (max-width: 600px) {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
  }

  & > div > table > tbody {
    display: block;
    width: 100%;
  }

  & > div > table > tbody > tr {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }

  & > div > table > tbody > tr > td {
    flex: 1;
    padding: 0.7vw;
    font-size: 1vw;
  }

  & > div > table > tbody > tr > td > button {
    padding: 0.5vw;
    font-size: 0.5vw;
  }

  .pagination {
    margin: 0;
    padding: 0;
    display: none;
    display: flex;
    justify-content: center;
    align-item: center;
    background: rgba(0, 0, 0, 0.5);
  }

  .no-content {
    text-align: center;
    padding: 20px;
    font-size: 1.2rem;
    color: #888;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .filters > div {
    flex: 1;
    margin-right: 10px;
  }

  .filters > div:last-child {
    margin-right: 0;
  }
  .responsive-button {
    font-size: 0.8vw;
    @media (max-width: 600px) {
      font-size: 1.2vw;
    }
  }

  .responsive-icon {
    font-size: 1.2vw;
    @media (max-width: 600px) {
      font-size: 2vw;
    }
  }
`;


const downloadFile = async (url, onDownloadComplete) => {
  try {
    const directUrl = getDirectDownloadLink(url);
    const link = document.createElement("a");
    link.href = directUrl;
    link.download = directUrl.split("/").pop().split("?")[0];
    link.style.display = "none";
    document.body.appendChild(link);

    toast.info("Download starting in a few seconds...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      link.click();
      document.body.removeChild(link);
      onDownloadComplete();
    }, 1000);
  } catch (error) {
    console.error("Error downloading file:", error);
    toast.error(`Unable to download! ${error.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
};

const getDirectDownloadLink = (url) => {
  if (url.includes("drive.google.com")) {
    return getGoogleDriveDirectLink(url);
  } else if (url.includes("dropbox.com")) {
    return getDropboxDirectLink(url);
  }
  return url;
};

const getGoogleDriveDirectLink = (url) => {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
  }
  return url;
};

const getDropboxDirectLink = (url) => {
  return url.replace(/dl=0$/, "dl=1");
};

export default function DataTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [grades, setGrades] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [gradeFilter, setGradeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [downloading, setDownloading] = useState(null);

  const RemoveEntry = async (userId) => {
    try {
      const userRef = ref(database, `worksheets/${userId}`);
      await remove(userRef);
      const updatedUsers = users.filter((user) => user.userId !== userId);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      toast.success("Deleted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error removing user:", error);
      toast.error("Error removing data!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleDownload = (user) => {
    setDownloading(user.userId);
    downloadFile(user.download_link, () => {
      setDownloading(null);
      toast.success("Download Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  };

  useEffect(() => {
    const usersRef = ref(database, "worksheets");
    setLoading(true); // Start loading
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersArray = Object.entries(snapshot.val()).map(
            ([key, value]) => ({
              userId: key,
              ...value,
            })
          );
          setUsers(usersArray);
          setFilteredUsers(usersArray);

          // Extract unique grades, categories, and subjects
          const uniqueGrades = [
            ...new Set(usersArray.map((user) => user.grade)),
          ];
          const uniqueCategories = [
            ...new Set(usersArray.map((user) => user.category)),
          ];
          const uniqueSubjects = [
            ...new Set(usersArray.map((user) => user.subject)),
          ];
          setGrades(uniqueGrades);
          setCategories(uniqueCategories);
          setSubjects(uniqueSubjects);
        } else {
          console.log("No Data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false); // End loading
      });
  }, []);

  useEffect(() => {
    let filtered = users;

    if (gradeFilter && gradeFilter !== "All Grades") {
      filtered = filtered.filter((user) => user.grade === gradeFilter);
      const subjectsForGrade = [
        ...new Set(filtered.map((user) => user.subject)),
      ];
      setFilteredSubjects(subjectsForGrade);
    } else {
      setFilteredSubjects(subjects);
    }

    if (subjectFilter) {
      filtered = filtered.filter((user) => user.subject === subjectFilter);
      const categoriesForSubject = [
        ...new Set(filtered.map((user) => user.category)),
      ];
      setFilteredCategories(categoriesForSubject);
    } else {
      setFilteredCategories(categories);
    }

    if (categoryFilter) {
      filtered = filtered.filter((user) => user.category === categoryFilter);
    }

    setFilteredUsers(filtered);
  }, [gradeFilter, subjectFilter, categoryFilter, users, categories, subjects]);

  const handleGradeFilterChange = (event) => {
    setGradeFilter(event.target.value);
    setSubjectFilter("");
    setCategoryFilter("");
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSubjectFilterChange = (event) => {
    setSubjectFilter(event.target.value);
    setCategoryFilter("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Component>
      <Typography variant="h4" align="center">
        Data Table
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center" marginBottom="2vw">
        <Grid item xs={12} md={4}>
          <TextField
            select
            label="Grade"
            value={gradeFilter}
            onChange={handleGradeFilterChange}
            fullWidth
          >
            <MenuItem value="">All Grades</MenuItem>
            {grades.map((grade) => (
              <MenuItem key={grade} value={grade}>
                {grade}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            select
            label="Subject"
            value={subjectFilter}
            onChange={handleSubjectFilterChange}
            fullWidth
            disabled={!gradeFilter}
          >
            <MenuItem value="">All Subjects</MenuItem>
            {filteredSubjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            select
            label="Category"
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            fullWidth
            disabled={!gradeFilter || !subjectFilter}
          >
            <MenuItem value="">All Categories</MenuItem>
            {filteredCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Download Link</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : filteredUsers.length === 0 ? (
        <Typography variant="h6" align="center" className="no-content">
          No Data Available
        </Typography>
      ) : (
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.title}</TableCell>
                    <TableCell>{user.grade}</TableCell>
                    <TableCell>{user.category}</TableCell>
                    <TableCell>{user.subject}</TableCell>
                    <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDownload(user)}
                        disabled={downloading === user.userId}
                        startIcon={
                          downloading === user.userId ? (
                            <CircularProgress size={20} />
                          ) : null
                        }
                      >
                        {downloading === user.userId ? "Downloading" : "Download"}
                      </Button>

                    </TableCell>
                    <TableCell>
                    <Button
                        variant="contained"
                        color="error"
                        className="responsiveButton"
                        size='20'
                        onClick={() => RemoveEntry(user.userId)}
                      >
                        Delete
                      </Button>

                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            )}
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="pagination"
            sx={{ width: '100%', overflowX: 'auto', textAlign: 'center' }} 
          />

        </TableContainer>
      
      <ToastContainer />
    </Component>
  );
}
