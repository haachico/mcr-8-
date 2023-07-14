import { useContext, useState } from "react";
import { MeetupsContext } from "..";
import Meetup from "../Components/Meetup";
import { Link } from "react-router-dom";

const MainPage = () => {
  const { displayedMeetups } = useContext(MeetupsContext);
  const [selectedType, setSelectedType] = useState(null);

  const handleSelectType = (e) => {
    setSelectedType(e.target.value);
  };

  const meetupsToBeDisplayed =
    selectedType === "ONLINE"
      ? [...displayedMeetups].filter((e) => e.eventType === "Online")
      : selectedType === "OFFLINE"
      ? [...displayedMeetups].filter((e) => e.eventType === "Offline")
      : displayedMeetups;

  return (
    <div>
      <div className="main--page--top">
        <h1 style={{ marginLeft: "1rem" }}>Meetup Events</h1>
        <select value={selectedType} onChange={(e) => handleSelectType(e)}>
          <option>Select event type</option>
          <option value="ALL">All</option>
          <option value="ONLINE">Online</option>
          <option value="OFFLINE">Offline</option>
        </select>
      </div>
      <div className="meetups--list">
        {meetupsToBeDisplayed.length > 0 ? (
          meetupsToBeDisplayed?.map((meetup) => (
            <Link to={`/meetup/${meetup.id}`}>
              <Meetup
                title={meetup.title}
                image={meetup.eventThumbnail}
                startTime={meetup.eventStartTime}
                eventType={meetup.eventType}
                key={meetup.id}
              />
            </Link>
          ))
        ) : (
          <h2>Sorry. No meetups with such title.</h2>
        )}
      </div>
    </div>
  );
};

export default MainPage;
