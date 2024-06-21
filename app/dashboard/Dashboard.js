import React, { useState, useEffect } from 'react';
import { auth, storage, firestore } from '../../components/firebase';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);

  const handleLogout = () => {
    auth.signOut();
  };

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
    console.log(user.uid);

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

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
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
    </div>
  );
};

export default Dashboard;
