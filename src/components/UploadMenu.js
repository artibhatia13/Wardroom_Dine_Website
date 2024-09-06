import React, { useState } from "react";
import { Box, Typography, Modal, OutlinedInput } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUnitContext } from "../context/unitContext";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { addDocument } from "../services/firestoreUtility";

const UploadMenuForm = ({ open, handleClose }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { unit } = useUnitContext();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Set the file name to display in the input field
    if (uploadedFile) {
      setFileName(uploadedFile.name);
    }
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file to upload.");
      return;
    }
    console.log("Starting extraction of file:", file);
    setIsLoading(true);

    // Reading the file using XLSX
    const reader = new FileReader();
    console.log("Initialized reader", reader);

    try {
      reader.onload = async (event) => {
        console.log("Inside reader.onload");
        const arrayBuffer = event.target.result;

        // Convert array buffer to binary string
        const data = new Uint8Array(arrayBuffer);
        const arr = Array.from(data)
          .map((char) => String.fromCharCode(char))
          .join("");

        // Read the Excel data
        const workbook = XLSX.read(arr, { type: "binary" });
        const sheetName = workbook.SheetNames[0]; // Assume first sheet
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          defval: "", // Sets a default value for empty cells
        });

        if (sheetData.length === 0) {
          console.warn("No data extracted from Excel sheet.");
          setIsLoading(false);
          alert(
            "No data found in the uploaded file. Please check the file format."
          );
          return;
        }

        const convertExcelDate = (excelDate) => {
          const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000); // Convert Excel serial date to JavaScript date
          const formattedDate = `${date
            .getDate()
            .toString()
            .padStart(2, "0")}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getFullYear()}`;
          return formattedDate;
        };

        // Process the data into the desired format
        const menuData = sheetData.map((row) => {
          const dateValue = row["DATE"];
          const formattedDate =
            typeof dateValue === "number"
              ? convertExcelDate(dateValue)
              : dateValue; // Convert numeric date to formatted string if necessary

          return {
            unit_id: unit.id,
            date: formattedDate,
            breakfast_count: { veg: unit.strength, non_veg: unit.strength },
            lunch_count: { veg: unit.veg_count, non_veg: unit.nonVeg_count },
            dinner_count: { veg: unit.veg_count, non_veg: unit.nonVeg_count },
            breakfast: row["BREAKFAST"] ? row["BREAKFAST"].split("\n") : [],
            lunch: row["LUNCH"] ? row["LUNCH"].split("\n") : [],
            dinner: row["DINNER"] ? row["DINNER"].split("\n") : [],
          };
        });
        if (menuData.length > 0) {
          let anyErrorOccurred = false; // Flag to track if any error occurs

          // Use Promise.all to wait for all async operations to complete
          await Promise.all(
            menuData.map(async (dailyMenu) => {
              const response = await addDocument(dailyMenu);
              if (!response.success) {
                anyErrorOccurred = true; // Set flag if an error occurred
                toast.error(response.message, {
                  position: "top-right",
                });
              }
            })
          );

          // Show success toast only if no errors occurred
          if (!anyErrorOccurred) {
            toast.success("All menus uploaded successfully!", {
              position: "top-right",
            });
          }
        }
      };
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("Failed to process the uploaded file.", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
      handleClose();
    }

    // Start reading the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "16px",
          p: 6,
        }}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "500" }}>
          Upload Menu
        </Typography>
        <OutlinedInput
          fullWidth
          readOnly
          value={fileName} // Bind fileName to input value
          placeholder="Choose a file"
          sx={{ mb: 2, paddingRight: "0" }}
          endAdornment={
            <label htmlFor="upload-button">
              <input
                id="upload-button"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Box
                px={2}
                display="flex"
                alignItems="center"
                sx={{
                  backgroundColor: "customColors.grey.light",
                  height: "4rem",
                  borderRadius: "0 16px 16px 0",
                  cursor: "pointer",
                }}
              >
                <Typography variant="subtitle1">Browse</Typography>
              </Box>
            </label>
          }
        />

        <LoadingButton
          variant="contained"
          color="primary"
          onClick={handleUpload}
          loading={isLoading}
          loadingPosition="start"
          sx={{
            width: "8rem",
            height: "2.4rem",
          }}
        >
          Upload
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default UploadMenuForm;
