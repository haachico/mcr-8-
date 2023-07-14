import { createContext, useState } from "react";
import { meetupsInfo } from "../data";

export const MeetupsContext = createContext();

export const MeetupsContextProvider = ({ children }) => {
  const [meetupsData, setMeetupsData] = useState(meetupsInfo.meetups);

  const [displayedMeetups, setDisplayedMeetups] = useState([]);
  return (
    <div>
      <MeetupsContext.Provider
        value={{
          meetupsData,
          setMeetupsData,
          displayedMeetups,
          setDisplayedMeetups
        }}
      >
        {children}
      </MeetupsContext.Provider>
    </div>
  );
};
