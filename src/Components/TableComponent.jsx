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
} from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import { get, ref } from "firebase/database";
import { database } from "../firebaseConfig";
import { useLocation } from "react-router-dom";
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
    display: flex;
    justify-content: center;
  }
`;
const getDirectDownloadLink = (url) => {
  if (url.includes("drive.google.com")) {
    return getGoogleDriveDirectLink(url);
  } else if (url.includes("dropbox.com")) {
    return getDropboxDirectLink(url);
  }
  return url;
};

const getGoogleDriveDirectLink = (url) => {
  // Extract the file ID from the Google Drive URL
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
  if (fileIdMatch) {
    // Return the direct download link format
    return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
  }
  // Throw an error if the URL is invalid
  throw new Error("Invalid Google Drive URL format");
};

const getDropboxDirectLink = (url) => {
  // Convert the Dropbox URL to direct download
  return url.replace(/dl=0$/, "dl=1");
};


const downloadFile = async (url, onDownloadComplete) => {
  try {
    console.log("Converting before");
    const directUrl = getDirectDownloadLink(url);
    console.log("Converting After");
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





export default function DataTable() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [grades, setGrades] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [subjects, setSubjects] = useState([]);
  const [gradeFilter, setGradeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [downloading, setDownloading] = useState(null);
  const [pathGrade, setPathGrade] = useState("");
  const [pathSubject, setPathSubject] = useState("");

  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    if (pathParts.length > 2) {
      let subject = pathParts[1];
      let grade = pathParts[2];
  
      // Format subject and grade to match stored values
      subject = subject.charAt(0).toUpperCase() + subject.slice(1);
      grade = grade.replace("grade-", "Grade");
      grade = grade.replace("-", ""); // Replace hyphen with space
  
      // Update state with formatted values
      setPathSubject(subject);
      setPathGrade(grade);
      setSubjectFilter(subject);
      setGradeFilter(grade);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchUsersByFilters();
  }, [categoryFilter, subCategoryFilter, pathGrade, pathSubject]);

  useEffect(() => {
    const usersRef = ref(database, "worksheets");
    setLoading(true);
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersArray = Object.entries(snapshot.val()).map(
            ([key, value]) => ({
              userId: key,
              ...value,
            })
          );
          console.log("Fetched users:", usersArray);
          setUsers(usersArray);

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
        setLoading(false);
      });
  }, []);

  const fetchUsersByFilters = async () => {
    try {
      const usersRef = ref(database, "worksheets");
      setLoading(true);
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const usersArray = Object.entries(snapshot.val()).map(
          ([key, value]) => ({
            userId: key,
            ...value,
          })
        );

        console.log("Users array before filtering:", usersArray);

        // Filter users based on the selected subject and grade
        const filtered = usersArray.filter(
          (user) =>
            user.grade === pathGrade &&
            user.subject === pathSubject &&
            (categoryFilter ? user.category === categoryFilter : true) &&
            (subCategoryFilter ? user.subCategory === subCategoryFilter : true)
        );

        console.log("Filtered users:", filtered);
        setFilteredUsers(filtered);

        // Update categories and subcategories based on the selected subject and grade
        const uniqueCategories = [
          ...new Set(
            usersArray
              .filter(
                (user) =>
                  user.subject === pathSubject &&
                  user.grade === pathGrade
              )
              .map((user) => user.category)
          ),
        ];
        setCategories(uniqueCategories);

        if (categoryFilter) {
          const uniqueSubcategories = [
            ...new Set(
              usersArray
                .filter(
                  (user) =>
                    user.subject === pathSubject &&
                    user.grade === pathGrade &&
                    user.category === categoryFilter
                )
                .map((user) => user.subCategory)
            ),
          ];
          setSubCategories(uniqueSubcategories);
        }
      }
    } catch (error) {
      console.error("Error fetching users by filters:", error);
    } finally {
      setLoading(false);
    }
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
      <Typography variant="h4">Data Table</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            label="Grade"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
          >
            {grades.map((grade) => (
              <MenuItem key={grade} value={grade}>
                {grade}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            label="Category"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setSubCategoryFilter("");
            }}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            select
            label="Sub-Category"
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
          >
            {subCategories.map((subCategory) => (
              <MenuItem key={subCategory} value={subCategory}>
                {subCategory}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Grade</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Sub-Category</TableCell>
                <TableCell>Download</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.grade}</TableCell>
                    <TableCell>{user.subject}</TableCell>
                    <TableCell>{user.category}</TableCell>
                    <TableCell>{user.subCategory}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        startIcon={<CloudDownload />}
                        onClick={() => {
                          setDownloading(user.userId);
                          downloadFile(user.download_link, () => {
                            setDownloading(null);
                          });
                        }}
                      >
                        {downloading === user.userId
                          ? "Downloading..."
                          : "Download"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
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
          />
        </TableContainer>
      )}

      <ToastContainer />
    </Component>
  );
}
