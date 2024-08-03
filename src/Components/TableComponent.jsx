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
import educationTime from "./../../src/assets/images/educationtime.jpg"
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
  const [gradeFilter, setGradeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
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

      subject = subject.charAt(0).toUpperCase() + subject.slice(1);

      if (grade.includes("grade")) {
        grade = grade.replace("grade-", "Grade ");
      } else if (grade.includes("-")) {
        grade = grade.charAt(0).toUpperCase() + grade.slice(1);
      }

      grade = grade.charAt(0).toUpperCase() + grade.slice(1);

      setPathSubject(subject);
      setPathGrade(grade);
      setSubjectFilter(subject);
      setGradeFilter(grade);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchUsersByFilters();
  }, [categoryFilter, pathGrade, pathSubject]);

  useEffect(() => {
    const usersRef = ref(database, "users");
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
      const usersRef = ref(database, "users");
      setLoading(true);
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const usersArray = Object.entries(snapshot.val()).map(
          ([key, value]) => ({
            userId: key,
            ...value,
          })
        );

        const filtered = usersArray.filter(
          (user) =>
            user.grade === pathGrade &&
            user.subject === pathSubject &&
            (categoryFilter ? user.category === categoryFilter : true)
        );

        setFilteredUsers(filtered);
        console.log(filtered);
      } else {
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Component>
      <img
        src={educationTime}
        alt="Top Image"
        style={{ width: "80%", marginBottom: "20px" }}
      />
      <Typography variant="h4">Filtered Data</Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Select Grade"
            value={pathGrade}
            onChange={(e) => setGradeFilter(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            disabled
          >
            {grades.map((grade) => (
              <MenuItem key={grade} value={grade}>
                {grade}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Select Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Select Subject"
            value={pathSubject}
            onChange={(e) => setSubjectFilter(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
            disabled
          >
            {subjects.map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Grade</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Download Link</TableCell>
              <TableCell>Download File</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.grade}</TableCell>
                    <TableCell>{user.category}</TableCell>
                    <TableCell>{user.subject}</TableCell>
                    <TableCell>{user.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleDownload(user)}
                        startIcon={<CloudDownload />}
                        disabled={downloading === user.userId}
                      >
                        {downloading === user.userId ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Download"
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="pagination"
      />
      <ToastContainer />
    </Component>
  );
}
