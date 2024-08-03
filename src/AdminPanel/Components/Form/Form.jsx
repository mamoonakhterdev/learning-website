import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Box, Button, MenuItem, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import categories from './Categories1'; // Import categories
import subCategories from './Categories2'; // Import subCategories

const DataForm = () => {
  // Form validation schema
  const validationSchema = Yup.object({
    grade: Yup.string().required('Grade is required'),
    subject: Yup.string().required('Subject is required'),
    category: Yup.string().required('Category is required'),
    subCategory: Yup.string().required('Sub-category is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    download_link: Yup.string().url('Invalid URL').required('Download link is required')
  });

  // Function to check if the download link is valid (Google Drive and Dropbox)
  const checkDownloadLink = async (url) => {
    try {
      // Regex patterns for Google Drive and Dropbox links
      const drivePattern = /^https:\/\/drive\.google\.com\/.*$/;
      const dropboxPattern = /^https:\/\/www\.dropbox\.com\/.*$/;
      
      // Check if the URL matches the patterns
      if (!drivePattern.test(url) && !dropboxPattern.test(url)) {
        return false;
      }

      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      grade: '',
      subject: '',
      category: '',
      subCategory: '',
      title: '',
      description: '',
      download_link: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const isValidLink = await checkDownloadLink(values.download_link);
        if (!isValidLink) throw new Error("Download link is not valid. Only Google Drive and Dropbox links are acceptable.");
        
        const valuesWithPublishedDate = { ...values, published: new Date().toISOString() };
        console.log("Form Data: ", valuesWithPublishedDate);
        const res = await fetch(
          "https://react-app-d461c-default-rtdb.asia-southeast1.firebasedatabase.app/worksheets.json",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(valuesWithPublishedDate),
          }
        );

        if (res.ok) {
          toast.success("Data added successfully!");
          resetForm();
        } else {
          throw new Error("Network response was not ok.");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred while adding the data.");
      } finally {
        setSubmitting(false);
      }
    }
  });

  // Generate options for subjects based on selected grade
  const getSubjects = () => {
    const { grade } = formik.values;
    return grade ? Object.keys(categories[grade] || {}) : [];
  };

  // Generate options for categories based on selected grade and subject
  const getCategories = () => {
    const { grade, subject } = formik.values;
    return grade && subject ? Object.keys(subCategories[grade][subject] || {}) : [];
  };

  // Generate options for sub-categories based on selected grade, subject, and category
  const getSubCategories = () => {
    const { grade, subject, category } = formik.values;
    return grade && subject && category ? subCategories[grade][subject][category] || [] : [];
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Data Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Box marginBottom={3}>
          <TextField
            select
            name="grade"
            label="Grade"
            variant="outlined"
            fullWidth
            value={formik.values.grade}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.grade)}
            helperText={formik.errors.grade}
          >
            {Object.keys(categories).map((grade) => (
              <MenuItem key={grade} value={grade}>
                {grade}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box marginBottom={3}>
          <TextField
            select
            name="subject"
            label="Subject"
            variant="outlined"
            fullWidth
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.subject)}
            helperText={formik.errors.subject}
            disabled={!formik.values.grade}
          >
            {getSubjects().map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box marginBottom={3}>
          <TextField
            select
            name="category"
            label="Category"
            variant="outlined"
            fullWidth
            value={formik.values.category}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.category)}
            helperText={formik.errors.category}
            disabled={!formik.values.subject}
          >
            {getCategories().map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box marginBottom={3}>
          <TextField
            select
            name="subCategory"
            label="Sub-category"
            variant="outlined"
            fullWidth
            value={formik.values.subCategory}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.subCategory)}
            helperText={formik.errors.subCategory}
            disabled={!formik.values.category}
          >
            {getSubCategories().map((subCategory) => (
              <MenuItem key={subCategory} value={subCategory}>
                {subCategory}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box marginBottom={3}>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.title)}
            helperText={formik.errors.title}
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.description)}
            helperText={formik.errors.description}
          />
        </Box>
        <Box marginBottom={3}>
          <TextField
            name="download_link"
            label="Download Link"
            variant="outlined"
            fullWidth
            value={formik.values.download_link}
            onChange={formik.handleChange}
            onBlur={async (e) => {
              const url = e.target.value;
              if (url && !(await checkDownloadLink(url))) {
                formik.setFieldError('download_link', 'Download link is not valid');
              }
            }}
            error={Boolean(formik.errors.download_link)}
            helperText={formik.errors.download_link}
          />
        </Box>
        <Box marginBottom={3} textAlign="center">
          <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default DataForm;
