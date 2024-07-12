import React, { useState, useEffect, useRef } from 'react';
import { auth, firestore } from '../../components/firebase';
import NavBar from '../../components/navigation';
import styled, {css} from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { PageContainer } from '@/components/styled-components'; // Ensure this path is correct
import { Saira_Extra_Condensed } from "next/font/google";
const daFont = Saira_Extra_Condensed({ subsets: ['latin'], weight: '600' });

// Define styled components
const Container = styled.div`
  width: 100%;
  height: 93vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr;
  background-color: #0a0e16;
  color: #c0c0c0;
  font-family: ${daFont.style.fontFamily};
`;
const Sidebar = styled.aside`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  background-color: #162029;
  padding: 20px;
  margin: 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-radius: 20px;
`;
const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border: 2px solid red;
  border-radius: 20px;
`;
const WelcomeText = styled.p`
  font-weight: bold;
  color: #71B1CD;;
  font-size: 32px;
  margin: 0 !important;
`;
const Username = styled.p`
  font-weight: bold;
  color: #1e90ff;
  margin: 0 !important;
  font-size: 24px;
  margin-top: -15px !important;
  color: #71B1CD;
`;
const Menu = styled.nav`
  width: 100%;
  ul {
    padding-inline-start: 0; /* Remove default padding */
    list-style-type: none; /* Remove default list style */
    padding: 0; /* Ensure no padding on all sides */
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;
const MenuItem = styled.li`
  margin: 4%;
  padding: 2%;
  text-align: center;
  font-size: 26px;
  cursor: pointer;
  color: white;
  list-style: none;
  background-color: ${(props) => (props.isActive ? '#71B1CD' : 'none')};
  ${(props) =>
    props.isActive &&
    css`
      background-color: #71B1CD;
      color: #0a0e16;
      border-radius: 30px;
    `}
  &:hover {
    background-color: #71B1CD;
    color: #0a0e16;
    border-radius: 30px;
  }
`;
const MenuTitle = styled.li`
  padding: 5%;
  font-size: 34px;
  text-align: left;
  color: #71B1CD;
  list-style: none;
  text-decoration: underline;
`
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
  background-color: #162029;
  color: #c0c0c0;
`;
const MainContent = styled.main`
  grid-column: 2/3;
  grid-row: 2/3;
  background-color: #162029;
  margin-bottom: 30px;
  margin-right: 30px;
  margin-top: 30px;
  border-radius: 20px;
  padding: 20px;
`;
const RightSidebar = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
  background-color: #162029;
  margin-top: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 20px;
  padding: 20px;
`;
const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 20px;
`;
const ProgressBar = styled.div`
  height: 10px; /* Set a fixed height for the progress bar */
  transition: width 0.2s ease-in-out;
  width: ${props => props.progress}%;
  background-color: #1e90ff;
`;
const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
`;
const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const Dashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState('Home');

  const closeUpload = () => {
    setTimeout(() => {
      setSuccessMessage('');
      setProgress(0);
      setFile(null);
      setDownloadURL('');
      setErrorMessage('');
      fileInputRef.current.value = '';
    }, 3000);
  };
  
  const setFileInDatabase = async () => {
    const user = auth.currentUser;
    if (user && file) {
      await firestore.collection('files').add({
        userId: user.uid,
        fileName: file.name,
        fileUrl: downloadURL,
        sharedWith: [],
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
      const allowedTypes = ['audio/mpeg', 'audio/wav'];
      if (!allowedTypes.includes(fileType)) {
        setErrorMessage('Invalid file type. Only .mp3 and .wav files are allowed.');
        setTimeout(() => {
          setErrorMessage('');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setFile(null);
        }, 3000);
        return;
      }
  
      // Check file size (60MB = 60 * 1024 * 1024 bytes)
      const maxSize = 60 * 1024 * 1024;
      if (fileSize > maxSize) {
        setErrorMessage('File size exceeds 60MB.');
        setTimeout(() => {
          setErrorMessage('');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          setFile(null);
        }, 3000);
        return;
      }
  
      setFile(selectedFile);
      setErrorMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    const metadata = { contentType: file.type };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
          console.log('File available at', downloadURL);
        });
        setSuccessMessage('File uploaded successfully!');
        setFileInDatabase();
      }
    );   
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
      <NavBar />
      <Container>
        <Sidebar>
          <ProfilePicture src="profile.jpg" alt="Profile Picture" />
          <WelcomeText>WELCOME BACK</WelcomeText>
          <Username>Leesto</Username>
          <Menu>
            <ul>
              <MenuTitle>MENU</MenuTitle>
                <MenuItem isActive={activeTab==='Home'} onClick={() => {setActiveTab('Home')}}>HOME</MenuItem>
                <MenuItem isActive={activeTab==='Contracts'} onClick={() => {setActiveTab('Contracts')}}>CONTRACTS</MenuItem>
                <MenuItem isActive={activeTab==='Profile'} onClick={() => {setActiveTab('Profile')}}>PROFILE</MenuItem>
              <MenuTitle>MY LIBRARY</MenuTitle>
                <MenuItem isActive={activeTab==='Uploads'} onClick={() => {setActiveTab('Uploads')}}>UPLOADS</MenuItem>
                <MenuItem isActive={activeTab==='Shared'} onClick={() => {setActiveTab('Shared')}}>SHARED WITH ME</MenuItem>
                <MenuItem isActive={activeTab==='Inquiries'} onClick={() => {setActiveTab('Inquiries')}}>INQUIRIES</MenuItem>
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
          <input type="file" onChange={handleFileChange} ref={fileInputRef} />
          <button onClick={handleUpload}>Upload</button>
          <ProgressBarContainer>
            <ProgressBar progress={progress} />
          </ProgressBarContainer>
          <span>{Math.round(progress)}%</span>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </RightSidebar>
      </Container>
    </PageContainer>
  );
};

export default Dashboard;
