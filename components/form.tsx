import React, { useRef, useEffect, useState } from 'react';
import s from 'styled-components'
import { Yaldevi } from 'next/font/google';

const TitleFont = Yaldevi({ subsets: ['latin'], weight: '600' });
const FormContainer = s.div`
`;

const InputTitle = s.h2`
color: #FFF;
font-family: ${TitleFont};
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
  font-family: ${TitleFont};
  font-size: 2em;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 20px;
  @media (max-width: 1600px) {
    font-size: 1.5em;
    }
    @media (max-width: 600px) {
font-size: .75em;
}
`;

const FormInput = s.input`
  width: 100%;
  height: 3vh;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: 5px;
  padding-right: 5px;
  border: none;
  border-bottom: 3px solid white;
  margin-bottom: 2vh;
  background: none;
  outline: none;
  font-size: 2em;
  font-family: ${TitleFont};
    @media (max-width: 1600px) {
    font-size: 1em;
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
  padding: 6px;

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
  font-size: 1.5em;
  margin-bottom: 1vh;
  border-bottom: 1px solid white;
  padding: 6px;
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
  height: 20vh;
  padding: 5px;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  background: none;
  border-bottom: 3px solid white;
  outline: none;
  font-size: 2em;
  font-family: ${TitleFont};
    @media (max-width: 1600px) {
    font-size: 1em;
    }
    @media (max-width: 600px) {
font-size: .75em;
}
`;

const SubmitButton = s.button`
  width: 100%;
  height: 55px;
  padding-left: 25px;
  padding-right: 25px;
  background: white;
  font-size: 2em;
  font-family: ${TitleFont};
  color: #71B1CD;
  margin-bottom: 5vh;
  margin-top: 5vh;
  border-radius: 20px;
   @media (max-width: 600px) {
    font-size: 1.25em;
    }
`

const StyledButton = s.button<{ selected: boolean }>`
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 20px;
  background-color: ${(props) => (props.selected ? '#ffffff' : '#34495e')};
  color: ${(props) => (props.selected ? '#34495e' : '#ffffff')};
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 25px;

  &:hover {
    background-color: ${(props) => (props.selected ? '#ecf0f1' : '#2c3e50')};
  }

  &:focus {
    outline: none;
  }
    @media (max-width: 600px) {
    font-size: .75em;
    }
`;


interface MyComponentProps {
    inputTitle: string;
    submitMusic?: boolean;
  }
  
export const Form: React.FC<MyComponentProps> = ({inputTitle, submitMusic}) => {
const [fullName, setFullName] = useState<string>('');
const [email, setEmail] = useState<string>('');
const [message, setMessage] = useState<string>('');

const [artistName, setArtist] = useState<string>('');
const [role, setRole] = useState<string>('');

const [youtube, setYoutube] = useState<string>('');
const [spotify, setSpotify] = useState<string>('');
const [soundcloud, setSoundcloud] = useState<string>('');

const [instagram, setInstagram] = useState<string>('');
const [tikTok, setTiktok] = useState<string>('');
const [website, setWebsite] = useState<string>('');

const handleFullNameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFullName(e.target.value);
};
const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
};
const handleMessageChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
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

return (
    <FormContainer>
    <InputTitle>{inputTitle}</InputTitle>
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
        {submitMusic && 
        <>
        <FormInputLabel>LABEL OR ARTIST / BAND NAME:</FormInputLabel>
        <FormInput
            type="text"
            value={artistName}
            onChange={handleArtistNameChange}
            placeholder=""
        />
        <FormInputLabel>YOUR ROLE:</FormInputLabel>
        <div>
            <StyledButton selected={role === 'Artist / Band'} onClick={() => handleRoleChange('Artist / Band')}>
            ARTIST / BAND
            </StyledButton>
            <StyledButton selected={role === 'Label'} onClick={() => handleRoleChange('Label')}>
            LABEL
            </StyledButton>
            <StyledButton selected={role === 'Manager'} onClick={() => handleRoleChange('Manager')}>
            MANAGER
            </StyledButton>
        </div>

        <FormInputLabel>YOUR CONTENT (AT LEAST 2)</FormInputLabel>
            <div>
            <FormInputLabelSmall placeholder='YOUTUBE:' disabled={true}></FormInputLabelSmall>
            <FormInputSmall
                type="text"
                value={youtube}
                onChange={handleYouTubeChange}
                placeholder="https://"
            />
            </div>
            <div>
            <FormInputLabelSmall placeholder='SPOTIFY:' disabled={true}></FormInputLabelSmall>
            <FormInputSmall
                type="text"
                value={spotify}
                onChange={handleSpotifyChange}
                placeholder="https://"
            />
            </div>
            <div>
            <FormInputLabelSmall placeholder='SOUNDCLOUD:' disabled={true}></FormInputLabelSmall>
            <FormInputSmall
                type="text"
                value={soundcloud}
                onChange={handleSoundcloudChange}
                placeholder="https://"
            />  
            </div>
            
            <FormInputLabel>SOCIAL MEDIA (AT LEAST 1)</FormInputLabel>
            <div>
            <FormInputLabelSmall placeholder='INSTAGRAM:' disabled={true}></FormInputLabelSmall>
            <FormInputSmall
                type="text"
                value={instagram}
                onChange={handleInstagramChange}
                placeholder="https://"
            />
            </div>
            <div>
            <FormInputLabelSmall placeholder='TIKTOK:' disabled={true}></FormInputLabelSmall>
            <FormInputSmall
                type="text"
                value={tikTok}
                onChange={handleTikTokChange}
                placeholder="https://"
            />
            </div>
            <div>
            <FormInputLabelSmall placeholder='WEBSITE:' disabled={true}></FormInputLabelSmall>
            <FormInputSmall
                type="text"
                value={website}
                onChange={handleWebsiteChange}
                placeholder="https://"
            />
            </div>
    </>}
        <FormInputLabel htmlFor="message">MESSAGE:</FormInputLabel>
        <FormTextarea
        id="message"
        value={message}
        onChange={handleMessageChange}
        rows={4} // Adjust the number of rows as needed
        />
    </FormInputs>
    <SubmitButton>SUBMIT REQUEST</SubmitButton>
    </FormContainer>
);
};


