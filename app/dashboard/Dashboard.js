import React, { useState, useEffect, useRef } from "react";
import { auth, firestore } from "../../components/firebase";
import NavBar from "../../components/navigation";
import styled, { css } from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { PageContainer } from "@/components/styled-components"; // Ensure this path is correct
import { Saira_Extra_Condensed, Orbitron } from "next/font/google";
const daFont = Orbitron({ subsets: ["latin"], weight: "700" });

import Sidebar from "./components/Sidebar";
import ListItem from "./components/ListItem";
import FileListHeader from "./components/FileListHeader";
import RightSidebar from "./components/RightSidebar";

// Define styled components
const Container = styled.div`
  width: 100%;
  height: 93vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr;
  background: var(
    --backgroundGradient2,
    linear-gradient(180deg, #142e54 0%, #2c66ba 100%)
  );
  color: #c0c0c0;
  font-family: ${daFont.style.fontFamily};
`;
const MenuTitle = styled.li`
  padding: 5%;
  font-size: 34px;
  text-align: left;
  color: #71b1cd;
  list-style: none;
  text-decoration: underline;
`;
const Header = styled.header`
  height: 15%;
  all: unset;
  grid-column: 2/3;
  grid-row: 1 / 2;
  background-color: #162029;
  margin-top: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding-top: 20px;
`;
const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
  border-radius: 20px;
  font-size: 1em;
  color: #c0c0c0;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const MainContent = styled.main`
  grid-column: 2/3;
  grid-row: 2/3;
  margin-bottom: 30px;
  margin-right: 30px;
  margin-top: 30px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  overflow: scroll;

`;
const ListContainer = styled.div`
  width: 100%;
  border-radius: 20px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Dashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [fileTab, setFileTab] = useState("All");
  const [file, setFile] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Notifications");
  const [editingFile, setEditingFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [sortAttribute, setSortAttribute] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const closeUpload = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setProgress(0);
      setFile(null);
      setFileSize(null);
      setDownloadURL("");
      setErrorMessage("");
      fileInputRef.current.value = "";
      fileInputRef.current.type = "text";
      fileInputRef.current.type = "file";
    }, 3000);
  };

  const setFileInDatabase = async (url) => {
    const user = auth.currentUser;
    if (user && file) {
      await firestore.collection("files").add({
        userId: user.uid,
        fileName: file.name,
        fileUrl: url,
        fileSize: fileSize,
        sharedWith: [],
        uploadDateAndTime: new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        }), // 8/19/2020, 9:29:51 AM. (date and time in a specific timezone)
      });
    }
    closeUpload();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile.type;
      const fileSize = selectedFile.size;

      // Check file type
      const allowedTypes = ["audio/mpeg", "audio/wav"];
      if (!allowedTypes.includes(fileType)) {
        setErrorMessage(
          "Invalid file type. Only .mp3 and .wav files are allowed."
        );
        setTimeout(() => {
          setErrorMessage("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          setFile(null);
        }, 3000);
        return;
      }

      // Check file size (60MB = 60 * 1024 * 1024 bytes)
      const maxSize = 60 * 1024 * 1024;
      if (fileSize > maxSize) {
        setErrorMessage("File size exceeds 60MB.");
        setTimeout(() => {
          setErrorMessage("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          setFile(null);
        }, 3000);
        return;
      }

      setFile(selectedFile);
      setFileSize(fileSize);
      setErrorMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    const metadata = { contentType: file.type };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((curr) => {
          console.log("File available at", curr);
          setDownloadURL(curr);
          setSuccessMessage("File uploaded successfully!");
          setFileInDatabase(curr);
        });
      }
    );
  };

  const fetchFiles = async () => {
    const user = auth.currentUser;
    const uploadsSnapshot = await firestore
      .collection("files")
      .where("userId", "==", user.uid)
      .get();

    const sharedSnapshot = await firestore
      .collection("files")
      .where("sharedWith", "array-contains", user.email)
      .get();

    setUploadedFiles(
      uploadsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setSharedFiles(
      sharedSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  const deleteFile = async (fileId) => {
    await firestore.collection("files").doc(fileId).delete();
    fetchFiles();
  };

  const startEditing = (file) => {
    setEditingFile(file);
    setNewFileName(file.fileName);
  };

  const saveNewFileName = async (file) => {
    await firestore.collection("files").doc(file.id).update({
      fileName: newFileName,
      uploadedAt: new Date(),
    });
    setEditingFile(null);
    setNewFileName("");
    fetchFiles();
  };

  const getDocumentById = async (collectionName, documentId) => {
    try {
      const docRef = firestore.collection(collectionName).doc(documentId);
      const doc = await docRef.get();

      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  };

  const handleSort = (attribute) => {
    setSortAttribute(attribute);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFileTabChange = (tab) => {
    setFileTab(tab);
  };

  const getFilteredFiles = () => {
    let files = [];
    switch (fileTab) {
      case 'All':
        files = allFiles;
        break;
      case 'Uploads':
        files = uploadedFiles;
        break;
      case 'Shared':
        files = sharedFiles;
        break;
      default:
        break;
    }
    if (searchQuery) {
      files = files.filter(file => file.fileName.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (sortAttribute) {
      files = files.sort((a, b) => {
        if (a[sortAttribute] < b[sortAttribute]) return -1;
        if (a[sortAttribute] > b[sortAttribute]) return 1;
        return 0;
      });
    }
    return files;
  };

  useEffect(() => {
    fetchFiles();
    console.log(auth.currentUser.uid);
    getDocumentById("users", auth.currentUser.uid);
  }, []);
  useEffect(() => {
    setAllFiles([...uploadedFiles, ...sharedFiles]);
  }, [uploadedFiles, sharedFiles]);

  return (
    <PageContainer>
      <NavBar />
      <Container>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Header>
          <SearchBar type="text" placeholder="Search..." />
        </Header>
        <MainContent>
          {activeTab === "File Management" && (
            <ListContainer>
              <FileListHeader
                fileTab={fileTab}
                handleSort={handleSort}
                handleSearch={handleSearch}
                handleFileTabChange={handleFileTabChange}
              />
              {getFilteredFiles().map(file => (
                <ListItem
                  key={file.id}
                  file={file}
                  editingFile={editingFile}
                  startEditing={setEditingFile}
                  saveNewFileName={setNewFileName}
                />
              ))}
            </ListContainer>
          )}
        </MainContent>
        <RightSidebar
          handleFileChange={handleFileChange}
          handleUpload={handleUpload}
          progress={progress}
          successMessage={successMessage}
          errorMessage={errorMessage}
          ref={fileInputRef}
        />
      </Container>
    </PageContainer>
  );
};

export default Dashboard;
