import React, { useState, useEffect } from 'react';
import { auth, storage, firestore } from '../../components/firebase';
import NavBar from '../../components/navigation'
import s from 'styled-components';
import { PageContainer, InfoContainerAbout, TitleContainer, ImageParagraphContainer, ContactUsButton, TheCard, MainContainer, TheFront, TheBack, CardsContainer, Stroke, BackCardContainer, Ocean, Wave  } from '@/components/styled-components';


const MenuSideBar = s.div`
  height: 100%;
  width: 10%;
  padding: 5%;
  border-radius: 20px;
  background: #0E1923;
`

export const InfoContainer = s.div`
    border-radius: 20px;
    border: 1px solid #FFF;
    width: 100%;
    height: 85vh;
    margin-left: 1vw;
    margin-right: 1vw;
    margin-top: 3vh;
    padding: 1vh 1vw;
    display: grid;
    grid-template-rows: 30% 70%;

    @media (max-width: 1000px) {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        overflow: auto;
    }
`;

const Container = s.div`
  width: 100%;
  height: 93vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr;
  background-color: #0a0e16;
  color: #c0c0c0;
`;

const Sidebar = s.aside`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  background-color: #162029;
  padding: 20px;
  // top and bottom | left and right
  margin: 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-radius: 20px;
`;

const ProfilePicture = s.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const WelcomeText = s.p`
margin-top: 10px;
margin-bottom: 5px;
font-weight: bold;
color: #1e90ff;
`;

const Username = s.p`
  margin-bottom: 40px;
  margin-top: 0px; 
  font-weight: bold;
  color: #1e90ff;
`;

const Menu = s.nav`
  width: 100%;
  padding: none;
  ul {
    padding-inline-start: 0; /* Remove default padding */
    list-style-type: none; /* Remove default list style */
    padding: 0; /* Ensure no padding on all sides */
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;

const MenuItem = s.li`
  padding: 5%;
  text-align: center;
  cursor: pointer;
  color: #1e90ff;
  list-style: none;

  &:hover {
    background-color: #1e90ff;
    color: #0a0e16;
    border-radius: 30px;
  }
`;

const Header = s.header`
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

const SearchBar = s.input`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: none;
  border-radius: 20px;
  font-size: 1em;
  background-color: #162029;
  color: #c0c0c0;
`;

const MainContent = s.main`
grid-column: 2/3;
grid-row: 2/3;
background-color: #162029;
margin-bottom: 30px;
margin-right: 30px;
margin-top: 30px;
border-radius: 20px;
padding: 20px;
`;

const RightSidebar = s.div`
grid-column: 3/4;
grid-row: 1/3;
background-color: #162029;
margin-top: 30px;
margin-right: 30px;
margin-bottom: 30px;
border-radius: 20px;
padding: 20px;
`;

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);



  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const fileUrl = await fileRef.getDownloadURL();

    const user = auth.currentUser;
    await firestore.collection('files').add({
      userId: user.uid,
      fileName: file.name,
      fileUrl: fileUrl,
      sharedWith: [],
      uploadedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setFile(null);
    alert('File uploaded successfully');
    fetchFiles();
  };

  const fetchFiles = async () => {
    const user = auth.currentUser;
    const uploadsSnapshot = await firestore
      .collection('files')
      .where('userId', '==', user.uid)
      .get();

    const sharedSnapshot = await firestore
      .collection('files')
      .where('sharedWith', 'array-contains', user.email)
      .get();

    setUploadedFiles(
      uploadsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
    setSharedFiles(
      sharedSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
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
    console.log(auth.currentUser.uid);
    getDocumentById('users', auth.currentUser.uid);
  }, []);

  return (
    <PageContainer>
        <NavBar/>
        <Container>
          <Sidebar>
            <ProfilePicture src="profile.jpg" alt="Profile Picture" />
            <WelcomeText>WELCOME BACK</WelcomeText>
            <Username>Leesto</Username>
            <Menu>
              <ul>
                <MenuItem>MENU</MenuItem>
                <MenuItem>HOME</MenuItem>
                <MenuItem>CONTRACTS</MenuItem>
                <MenuItem>PROFILE</MenuItem>
                <MenuItem>MY LIBRARY</MenuItem>
                <MenuItem>UPLOADS</MenuItem>
                <MenuItem>SHARED WITH ME</MenuItem>
                <MenuItem>INQUIRIES</MenuItem>
              </ul>
            </Menu>
          </Sidebar>
          <Header>
            <SearchBar type="text" placeholder="Search..." />
          </Header>
          <MainContent>
            {/* Main content goes here */}
          </MainContent>
          <RightSidebar>
            {/* Right sidebar content */}
          </RightSidebar>
        </Container>
      </PageContainer>
      );
      
      
      
      
      
      
      
      
      
      
      {/* <InfoContainerAbout>
        <h1>Dashboard</h1>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        <h2>Your Files</h2>
        <ul>
          {uploadedFiles.map((file) => (
            <li key={file.id}>
              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                {file.fileName}
              </a>
            </li>
          ))}
        </ul>
        <h2>Shared Files</h2>
        <ul>
          {sharedFiles.map((file) => (
            <li key={file.id}>
              <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                {file.fileName}
              </a>
            </li>
          ))}
        </ul>
      </InfoContainerAbout> */}
};

export default Dashboard;
