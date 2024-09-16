import React, { useRef, useEffect, useState } from "react";
import s from "styled-components";
import { Yaldevi } from "next/font/google";
import { auth, firestore } from "./firebase";

const TitleFont = Yaldevi({ subsets: ["latin"], weight: "600" });

const FormContainer = s.div`
display: flex;
flex-flow: column nowrap;
`;

const InputTitle = s.h2`
color: #FFF;
font-family: ${TitleFont.style.fontFamily};
font-size: 3em;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 5vh;
margin-top: 0;
@media (max-width: 1600px) {
font-size: 2em;
}
@media (max-width: 600px) {
font-size: .75em;
}
`;

const FormInputs = s.div`
  display: flex;
  flex-direction: column;
`;

const FormInputLabel = s.label`
  color: #FFF;
  font-family: ${TitleFont.style.fontFamily};
  font-size: 2em;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 20px;
  @media (max-width: 1600px) {
    font-size: 1em;
    }
    @media (max-width: 600px) {
font-size: .75em;
}
`;

const FormInput = s.input`
  width: 100%;
  height: 3vh;
  border: none;
  border-bottom: 3px solid white;
  padding-bottom: 8px;
  text-transform: uppercase;
  margin-bottom: 2vh;
  background: none;
  outline: none;
  font-size: 2em;
  color: white;
  font-family: ${TitleFont.style.fontFamily};
    @media (max-width: 1600px) {
    font-size: 1.5em;
    }
    @media (max-width: 600px) {
font-size: .75em;
}
`;

const FormInputLabelSmall = s(FormInput)`
  width: 20%;
  font-size: 1.5em;
  margin-bottom: 1vh;
  border-bottom: 1px solid white;
  &:disabled::placeholder {
    color: #FFF;
    opacity: 1;
  }
    @media (max-width: 1600px) {
    font-size: 1em;
    }
    @media (max-width: 600px) {
font-size: .75em;
}
`;

const FormInputSmall = s(FormInput)`
  width: 80%;
  color: white;
  font-size: 1.5em;
  margin-bottom: 1vh;
  border-bottom: 1px solid white;
  &::placeholder {
    color: #909EAA;
  }
      @media (max-width: 1600px) {
    font-size: 1em;
    }
    @media (max-width: 600px) {
font-size: .75em;
}
`;

const FormTextarea = s.textarea`
  width: 100%;
  text-transform: uppercase;
  color: white;
  height: 20vh;
  padding: 5px;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  background: none;
  border-bottom: 3px solid white;
  outline: none;
  font-size: 2em;
  font-family: ${TitleFont};
    @media (max-width: 1600px) {
    font-size: 1.5em;
    }
    @media (max-width: 600px) {
font-size: .75em;
}
`;

const SubmitButton = s.button`
  width: 103%;
  box-shadow: none;
  border: 2px solid white;
  transition: background .5s ease-in-out;
  transition: color .5s ease-in-out;
  height: 55px;
  cursor: pointer;
  padding-left: 25px;
  padding-right: 25px;
  background: none;
  cursor: pointer;
  font-size: 2em;
  font-family: ${TitleFont.style.fontFamily};
  color: white;
  background: #71B1CD;
  margin-bottom: 5vh;
  margin-top: 5vh;
  &:hover {
    background: white;
    color: #71B1CD;
  }
   @media (max-width: 600px) {
    font-size: 1.25em;
    }

`;

const StyledButton = s.button<{ selected: boolean }>`
  padding: 10px 20px;
  font-family: ${TitleFont.style.fontFamily};
  margin: 0 5px;
  border: none;
  border-radius: 20px;
  background-color: ${(props) => (props.selected ? "#ffffff" : "#34495e")};
  color: ${(props) => (props.selected ? "#34495e" : "#ffffff")};
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 25px;

  &:hover {
    background-color: ${(props) => (props.selected ? "#ecf0f1" : "#2c3e50")};
  }

  &:focus {
    outline: none;
  }
    @media (max-width: 600px) {
    font-size: .75em;
    }
`;

const SuccessMessage = s.div`
font-family: ${TitleFont.style.fontFamily};
font-size: 3em;
font-style: normal;
font-weight: 600;
color: #00063F;
text-transform: uppercase;
align-self: center;
@media (max-width: 1600px) {
font-size: 2em;
}
@media (max-width: 600px) {
font-size: .75em;
}
`;

const ErrorMessage = s.div`
font-family: ${TitleFont.style.fontFamily};
margin-top: 0;
padding-top: 0;
font-size: 1em;
font-style: normal;
font-weight: 600;
color: red;
text-transform: uppercase;
@media (max-width: 1600px) {
font-size: 1em;
}
@media (max-width: 600px) {
font-size: 1em;
}
`;

interface MyComponentProps {
  inputTitle: string;
  submitMusic?: boolean;
}

export const Form: React.FC<MyComponentProps> = ({
  inputTitle,
  submitMusic,
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [artistName, setArtist] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const [youtube, setYoutube] = useState<string>("");
  const [spotify, setSpotify] = useState<string>("");
  const [soundcloud, setSoundcloud] = useState<string>("");

  const [instagram, setInstagram] = useState<string>("");
  const [tikTok, setTiktok] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleFullNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFullName(e.target.value);
  };
  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };
  const handleMessageChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMessage(e.target.value);
  };

  const handleArtistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(e.target.value);
  };
  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
  };
  const handleYouTubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutube(e.target.value);
  };
  const handleSpotifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpotify(e.target.value);
  };
  const handleSoundcloudChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoundcloud(e.target.value);
  };
  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInstagram(e.target.value);
  };
  const handleTikTokChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTiktok(e.target.value);
  };
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsite(e.target.value);
  };

  interface FormData {
    fullName: string;
    email: string;
    message: string;
    artistName?: string;
    role?: string;
    youtube?: string;
    spotify?: string;
    soundcloud?: string;
    instagram?: string;
    tikTok?: string;
    website?: string;
  }

  const setFileInDatabase = async (formData: FormData) => {
    try {
      await firestore.collection("form-submission").add(formData);
      // Handle success (e.g., show a success message or redirect)
      console.log("Form submitted successfully!");
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error submitting form: ", error);
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateURL = (url: string) => {
    const re = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
    return re.test(url);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let isValid = true;

    // Validate full name
    if (fullName.split(" ").length <= 1) {
      setErrorMessage("Please submit full name");
      isValid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
      setErrorMessage("Please submit a valid email");
      isValid = false;
    }

    // Validate message
    if (message.split(" ").length <= 1) {
      setErrorMessage("Please submit a valid message");
      isValid = false;
    }

    if (submitMusic) {
      // Validate artist name
      if (artistName.length < 1) {
        setErrorMessage("Please submit a LABEL OR ARTIST/BAND NAME");
        isValid = false;
      }

      // Validate role
      if (role.length < 1) {
        setErrorMessage("Please select a role");
        isValid = false;
      }

      // Validate content URLs
      let contentCount = 0;
      if (validateURL(youtube)) contentCount++;
      if (validateURL(spotify)) contentCount++;
      if (validateURL(soundcloud)) contentCount++;

      if (contentCount < 2) {
        setErrorMessage("Please submit 2 valid content URLs");
        isValid = false;
      }

      // Validate social media URLs
      let socialMediaCount = 0;
      if (validateURL(tikTok)) socialMediaCount++;
      if (validateURL(instagram)) socialMediaCount++;
      if (validateURL(website)) socialMediaCount++;

      if (socialMediaCount < 1) {
        setErrorMessage("Please submit at least 1 valid social media URL");
        isValid = false;
      }
    }

    if (isValid) {
      // If all validations pass, create the formData object
      const formData: FormData = {
        fullName,
        email,
        message,
        artistName,
        role,
        youtube,
        spotify,
        soundcloud,
        instagram,
        tikTok,
        website,
      };

      // Submit the form data to the database
      setFileInDatabase(formData);

      // Clear form fields and show success message
      setFullName("");
      setEmail("");
      setMessage("");
      setArtist("");
      setRole("");
      setYoutube("");
      setSpotify("");
      setSoundcloud("");
      setInstagram("");
      setTiktok("");
      setWebsite("");
      setErrorMessage("");
      setSuccessMessage("Form submitted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }

    // Clear error messages after a delay
    setTimeout(() => {
      setErrorMessage("");
    }, 1500);
  };

  return (
    <FormContainer>
      <InputTitle>{inputTitle}</InputTitle>
      {successMessage.length === 0 && (
        <>
          <FormInputs>
            <FormInputLabel htmlFor="fullName">FULL NAME:</FormInputLabel>
            <FormInput
              type="text"
              id="fullName"
              value={fullName}
              onChange={handleFullNameChange}
            />
            <FormInputLabel htmlFor="email">YOUR EMAIL:</FormInputLabel>
            <FormInput
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            {submitMusic && (
              <>
                <FormInputLabel>LABEL OR ARTIST/BAND NAME:</FormInputLabel>
                <FormInput
                  type="text"
                  value={artistName}
                  onChange={handleArtistNameChange}
                  placeholder=""
                />
                <FormInputLabel>YOUR ROLE:</FormInputLabel>
                <div>
                  <StyledButton
                    selected={role === "Artist / Band"}
                    onClick={() => handleRoleChange("Artist / Band")}
                  >
                    ARTIST / BAND
                  </StyledButton>
                  <StyledButton
                    selected={role === "Label"}
                    onClick={() => handleRoleChange("Label")}
                  >
                    LABEL
                  </StyledButton>
                  <StyledButton
                    selected={role === "Manager"}
                    onClick={() => handleRoleChange("Manager")}
                  >
                    MANAGER
                  </StyledButton>
                  <StyledButton
                    selected={role === "Other"}
                    onClick={() => handleRoleChange("Other")}
                  >
                    OTHER
                  </StyledButton>
                </div>

                <FormInputLabel>YOUR CONTENT (AT LEAST 2):</FormInputLabel>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FormInputLabelSmall
                    placeholder="YOUTUBE:"
                    disabled={true}
                  ></FormInputLabelSmall>
                  <FormInputSmall
                    type="text"
                    value={youtube}
                    onChange={handleYouTubeChange}
                    placeholder="https://"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FormInputLabelSmall
                    placeholder="SPOTIFY:"
                    disabled={true}
                  ></FormInputLabelSmall>
                  <FormInputSmall
                    type="text"
                    value={spotify}
                    onChange={handleSpotifyChange}
                    placeholder="https://"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FormInputLabelSmall
                    placeholder="SOUNDCLOUD:"
                    disabled={true}
                  ></FormInputLabelSmall>
                  <FormInputSmall
                    type="text"
                    value={soundcloud}
                    onChange={handleSoundcloudChange}
                    placeholder="https://"
                  />
                </div>

                <FormInputLabel>SOCIAL MEDIA (AT LEAST 1):</FormInputLabel>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FormInputLabelSmall
                    placeholder="INSTAGRAM:"
                    disabled={true}
                  ></FormInputLabelSmall>
                  <FormInputSmall
                    type="text"
                    value={instagram}
                    onChange={handleInstagramChange}
                    placeholder="https://"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FormInputLabelSmall
                    placeholder="TIKTOK:"
                    disabled={true}
                  ></FormInputLabelSmall>
                  <FormInputSmall
                    type="text"
                    value={tikTok}
                    onChange={handleTikTokChange}
                    placeholder="https://"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <FormInputLabelSmall
                    placeholder="WEBSITE:"
                    disabled={true}
                  ></FormInputLabelSmall>
                  <FormInputSmall
                    type="text"
                    value={website}
                    onChange={handleWebsiteChange}
                    placeholder="https://"
                  />
                </div>
              </>
            )}
            <FormInputLabel htmlFor="message">MESSAGE:</FormInputLabel>
            <FormTextarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              rows={4} // Adjust the number of rows as needed
            />
          </FormInputs>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <SubmitButton onClick={handleSubmit}>SUBMIT REQUEST</SubmitButton>
        </>
      )}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </FormContainer>
  );
};
