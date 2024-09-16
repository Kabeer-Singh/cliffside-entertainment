import React, { useState, useEffect, useRef } from "react";
import { auth, firestore } from "../../components/firebase";
import NavBar from "../../components/navigation";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";
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
const PageContainerDashboard = styled(PageContainer)`
  background: #e0e0e0;
`;
const Container = styled.div`
  grid-template-rows: 30% 1fr; /* Ensuring the first row is 35% of the container's height */
  grid-template-columns: 1fr 3fr 1fr;
  width: 100%;
  height: 93vh;
  display: grid;
  background: white;
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
  grid-column: 2/3;
  grid-row: 1 / 2;
  background-color: #f5f6f9;
  margin-top: 30px;
  margin-right: 30px;
  margin-left: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 20px;
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
  margin: 30px;
  border-radius: 20px;
  background: #fff;
  overflow-x: hidden;
`;
const ListContainer = styled.div`
  width: 100%;
  border-radius: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden; /* Prevent the entire container from scrolling */
`;
const MockUp = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
  margin-top: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 20px;
  padding: 20px;
  background: red;
`;

const Dashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [fileTab, setFileTab] = useState("All");

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileSizes, setFileSizes] = useState([]);
  const [progresses, setProgresses] = useState([]);

  const [downloadURL, setDownloadURL] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Notifications");
  const [editingFile, setEditingFile] = useState(null);
  const [newFileName, setNewFileName] = useState("");
  const [sortAttribute, setSortAttribute] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [userData, setUserData] = useState({
    profilePicUrl: "",
    email: "",
    name: "",
  });
  const [profilePic, setProfilePic] = useState("");

  const closeUpload = (file, revisedFile) => {
    setSuccessMessage("File " + file.name + " uploaded successfully!");

    setTimeout(() => {
      setSuccessMessage("");
      setDownloadURL("");

      setProgresses((prevProgresses) => {
        const updatedProgresses = { ...prevProgresses };
        delete updatedProgresses[file.id];
        return updatedProgresses;
      });

      setSelectedFiles((prevSelectedFiles) =>
        prevSelectedFiles.filter((selectedFile) => selectedFile.id !== file.id)
      );

      //adding the successfully uploaded files to uploadedFiles & allFiles
      setUploadedFiles((prevFiles) => [...prevFiles, revisedFile]);
      setAllFiles((prevFiles) => [...prevFiles, revisedFile]);
    }, 3000);
  };

  const setFileInDatabase = async (file, downloadURL) => {
    const user = auth.currentUser;

    if (user && file) {
      try {
        // Add file metadata to Firestore and capture the document reference
        const docRef = await firestore.collection("files").add({
          userId: user.uid,
          fileName: file.name,
          fileUrl: downloadURL,
          sharedWith: [],
        });

        // Capture the Firestore document ID and add it to the file object
        const fileWithId = {
          ...file,
          id: docRef.id, // Firestore document ID
          fileUrl: downloadURL, // File URL
          fileName: file.name, // File name
        };

        // Pass the updated file object with ID to closeUpload
        closeUpload(file, fileWithId);
      } catch (error) {
        console.error("Error uploading file to Firestore:", error);
      }
    }
  };

  const handleUploadAll = async () => {
    for (let i = 0; i < selectedFiles.length; i++) {
      await handleUpload(selectedFiles[i]);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Slight delay for sequential processing
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files || e;
    //setting valid files after completed validation
    // Validate file types and sizes
    const validFiles = [];
    const validSizes = [];
    for (let file of files) {
      // Assign a unique ID to each file
      file.id = uuidv4();
      validFiles.push(file);
      validSizes.push(file.size);
    }
    setSelectedFiles(validFiles);
    setFileSizes(validSizes);
    setProgresses(new Array(validFiles.length).fill(0));
  };

  const handleUpload = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage, file.name);
      const metadata = { contentType: file.type };

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgresses((prev) => ({ ...prev, [file.id]: progress }));
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setFileInDatabase(file, downloadURL).then(() => {
              resolve(); // Resolve the promise once the file is successfully uploaded
            });
          });
        }
      );
    });
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
  };

  const saveNewFileName = async (newFileName) => {
    console.log('entering saveNEWFileName');
    console.log(editingFile)
    console.log(newFileName);
    await firestore.collection("files").doc(editingFile.id).update({
      fileName: newFileName,
      uploadedAt: new Date(),
    });
    setEditingFile(null);
    setNewFileName('');
    fetchFiles();
    console.log('exiting saveNewFileName');
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

  useEffect(() => {
    fetchFiles();
    const fetchUserData = async () => {
      try {
        // Fetch the user data from Firestore
        const userDoc = await firestore
          .collection("users")
          .doc(auth.currentUser.uid)
          .get(); // replace 'userId' with the actual ID

        if (userDoc.exists) {
          const data = userDoc.data();
          setUserData({
            profilePicUrl: data?.profilePicUrl || "",
            email: data?.email || "",
            name: data?.name || "",
          });

          // Fetch the profile picture from Firebase Storage
          if (data?.profilePicUrl) {
            const storage = getStorage();
            const imageRef = ref(storage, data.profilePicUrl);
            const url = await getDownloadURL(imageRef);
            setProfilePic(url);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
      case "All":
        files = allFiles;
        break;
      case "Uploads":
        files = uploadedFiles;
        break;
      case "Shared":
        files = sharedFiles;
        break;
      default:
        break;
    }
    if (searchQuery) {
      files = files.filter((file) =>
        file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      );
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
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          profilePic={profilePic}
          userName={userData.name}
        />
        {activeTab === "File Management" && (
          <Header>
            <RightSidebar
              selectedFiles={selectedFiles}
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
              handleUploadAll={handleUploadAll}
              progresses={progresses}
              successMessage={successMessage}
            />
          </Header>
        )}
        <MainContent>
          {activeTab === "File Management" && (
            <ListContainer>
              <FileListHeader
                fileTab={fileTab}
                handleSort={handleSort}
                handleSearch={handleSearch}
                handleFileTabChange={handleFileTabChange}
              />
              <div
                style={{
                  overflow: "scroll",
                  borderBottom: "2px inset #ebedef",
                  borderRadius: "20px",
                  width: '99%',
                }}
              >
                {getFilteredFiles().map((file) => (
                  <ListItem
                    key={file.id}
                    file={file}
                    editingFile={editingFile}
                    startEditing={startEditing}
                    saveNewFileName={saveNewFileName}
                    deleteFile = {deleteFile}
                  />
                ))}
              </div>
            </ListContainer>
          )}
        </MainContent>
        <MockUp>HELLO</MockUp>
      </Container>
    </PageContainer>
  );
};

export default Dashboard;
