import React, { useState, useEffect, useRef } from 'react';
import { auth, firestore } from '../../components/firebase';
import NavBar from '../../components/navigation';
import styled, {css} from 'styled-components';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { PageContainer } from '@/components/styled-components'; // Ensure this path is correct
import { Saira_Extra_Condensed, Orbitron } from "next/font/google";
const daFont = Orbitron({ subsets: ['latin'], weight: '700' });


// Define styled components
const Container = styled.div`
  width: 100%;
  height: 93vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr;
  background: var(--backgroundGradient2, linear-gradient(180deg, #142E54 0%, #2C66BA 100%));
  color: #c0c0c0;
  font-family: ${daFont.style.fontFamily};
`;
const Sidebar = styled.aside`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  padding: 20px;
  margin: 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const ProfilePicture = styled.img`
  width: 175px;
  height: 175px;
  margin-top: 8px;
  border-radius: 20px;
  align-self: center;
  margin-bottom: 8px;
`;
const WelcomeText = styled.p`

  margin: 0 !important;
  text-align: center;
  font-family: ${daFont.style.fontFamily};
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: var(--backgroundGradient2, linear-gradient(180deg, #142E54 0%, #2C66BA 100%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;



`;
const Username = styled.p`
  margin: 0 !important;
  margin-top: -5px !important;
  margin-bottom: 45px !important;
  text-align: center;
  font-family: ${daFont.style.fontFamily};
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: var(--backgroundGradient2, linear-gradient(180deg, #142E54 0%, #2C66BA 100%));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

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
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 12px;
  cursor: pointer;
  color: #B3B3B3;
  list-style: none;
  background-color: ${(props) => (props.isActive ? '#71B1CD' : 'none')};
  ${(props) =>
    props.isActive &&
    css`
      color: white;
      border-radius: 20px;
      background: var(--backgroundGradient2, linear-gradient(180deg, #142E54 0%, #2C66BA 100%));
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    `}
  &:hover {
    color: white;
    border-radius: 20px;
    background: var(--backgroundGradient2, linear-gradient(180deg, #142E54 0%, #2C66BA 100%));
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 15px;
  margin-left: 15px;
  align-self: flex-start;
`;

const NotificationMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return(
    <MenuItem 
      isActive={isActive} 
      onClick={() => setActiveTab('Notifications')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={(isActive || isHovered) ? '/activeIcons/notificationActive.png' : '/nonActiveIcons/notification.png'}
        alt="icon"
      />
      Notification Center
    </MenuItem>
  );
};
const ContractMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return(
    <MenuItem 
      isActive={isActive} 
      onClick={() => setActiveTab('Contracts')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={(isActive || isHovered) ? '/activeIcons/contractActive.png' : '/nonActiveIcons/contract.png'}
        alt="icon"
      />
      Contracts
    </MenuItem>
  );
};
const ProfileMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return(
    <MenuItem 
      isActive={isActive} 
      onClick={() => setActiveTab('Profile')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={(isActive || isHovered) ? '/activeIcons/profileActive.png' : '/nonActiveIcons/profile.png'}
        alt="icon"
      />
      Profile
    </MenuItem>
  );
};
const UploadMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return(
    <MenuItem 
      isActive={isActive} 
      onClick={() => setActiveTab('Uploads')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={(isActive || isHovered) ? '/activeIcons/uploadActive.png' : '/nonActiveIcons/upload.png'}
        alt="icon"
      />
      Uploads
    </MenuItem>
  );
};
const SharedMenuItem = ({ isActive, setActiveTab }) => {
  const [isHovered, setIsHovered] = useState(false);
  return(
    <MenuItem 
      isActive={isActive} 
      onClick={() => setActiveTab('Shared')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        src={(isActive || isHovered) ? '/activeIcons/sharedActive.png' : '/nonActiveIcons/shared.png'}
        alt="icon"
      />
      Shared
    </MenuItem>
  );
};

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
  color: #c0c0c0;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const MainContent = styled.main`
  grid-column: 2/3;
  grid-row: 2/3;
  margin-bottom: 30px;
  margin-right: 30px;
  margin-top: 30px;
  padding: 20px;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const RightSidebar = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
  margin-top: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 20px;
  padding: 20px;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
  const [activeTab, setActiveTab] = useState('Notifications');

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
          <ProfilePicture src="jalen.jpeg" alt="Profile Picture" />
          <WelcomeText>WELCOME BACK</WelcomeText>
          <Username>Leesto</Username>
          <Menu>
            <ul>
              <NotificationMenuItem
                isActive={activeTab === 'Notifications'}
                setActiveTab={setActiveTab}
              />
              <ContractMenuItem 
                isActive={activeTab === 'Contracts'}
                setActiveTab={setActiveTab}
              />
              <ProfileMenuItem
                isActive={activeTab === 'Profile'}
                setActiveTab={setActiveTab}
              />
              <UploadMenuItem
                isActive={activeTab === 'Uploads'}
                setActiveTab={setActiveTab}
              />
              <SharedMenuItem
                isActive={activeTab === 'Shared'}
                setActiveTab={setActiveTab}
              />
            </ul>
          </Menu>
        </Sidebar>
        <Header>
          <SearchBar type="text" placeholder="Search..." />
        </Header>
        <MainContent>
          <ul>
            {activeTab==='Uploads' && 
              uploadedFiles.map((file) => (
              <li key={file.id}>
                <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                  {file.fileName}
                </a>
              </li>
            ))}
            {activeTab==='Shared' && 
              sharedFiles.map((file) => (
                <li key={file.id}>
                  <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                    {file.fileName}
                  </a>
                </li>
            ))}
          </ul>
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
