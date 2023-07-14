import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Speaker from "../Components/Speaker";

import { MeetupsContext } from "..";

const DetailsPage = () => {
  const { meetupsData } = useContext(MeetupsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isFormFilled, setIsFormedFilled] = useState(false);
  const [RSPVedEvents, setRSPVedEvents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  const { ID } = useParams();

  const selectedMeetup = meetupsData.find((meetup) => meetup.id == ID);

  console.log(selectedMeetup);

  function getTime(timing) {
    const dateTime = new Date(timing);
    const dayOfWeek = dateTime.toLocaleDateString("en-US", { weekday: "long" });

    const date = dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const time = dateTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric"
    });
    return `${dayOfWeek} ${date} at ${time}`;
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm((prevStates) => {
      return {
        ...prevStates,
        [name]: value
      };
    });
  };

  const handleSubmit = (e, selectedMeetup) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setRSPVedEvents((prevRSVPed) => [...prevRSVPed, selectedMeetup]);

    setIsOpen(false);
  };
  return (
    <div style={{ backgroundColor: " #f1f5f9", padding: "2rem" }}>
      <Link to="/" className="back--btn">
        Back
      </Link>
      <div className="details--info">
        <div className="left--div">
          <h2>Marketing Seminar</h2>
          <p>Hosted by : </p>
          <h4>Marketing Experts</h4>
          <img src={selectedMeetup.eventThumbnail} alt={selectedMeetup.title} />
          <h3>Details : </h3>
          <p style={{ textAlign: "left", width: "38rem" }}>
            {selectedMeetup.eventDescription}
          </p>
          <h3>Additional Information : </h3>
          <p>
            <strong>Dress code </strong> :{" "}
            {selectedMeetup.additionalInformation.dressCode}
          </p>
          <p>
            <strong>Age restriction </strong> :{" "}
            {selectedMeetup.additionalInformation.ageRestrictions}
          </p>
          <h3>Event tags : </h3>
          <div className="tags">
            {selectedMeetup.eventTags.map((tag) => (
              <span>{tag}</span>
            ))}
          </div>
        </div>
        <div className="right--div">
          <div className="top">
            <p>
              <span style={{ marginRight: "10px" }}>
                <i class="fa-regular fa-clock"></i>
              </span>{" "}
              {getTime(selectedMeetup.eventStartTime)} to{" "}
              {getTime(selectedMeetup.eventEndTime)}
            </p>
            <p>
              <span style={{ marginRight: "10px" }}>
                <i class="fa-solid fa-location-dot"></i>
              </span>
              {selectedMeetup.address}
            </p>
            <p>
              {" "}
              <span style={{ marginRight: "10px" }}>
                <i class="fa-solid fa-indian-rupee-sign"></i>
              </span>
              {selectedMeetup.price}
            </p>
          </div>
          <h3>Speakers : {selectedMeetup.speakers.length} </h3>
          <div className="speakers">
            {selectedMeetup.speakers.map((e) => (
              <Speaker
                name={e.name}
                image={e.image}
                designation={e.designation}
                key={e.name}
              />
            ))}
          </div>
          <div style={{ position: "relative" }}>
            {isOpen && (
              <form onClick={(e) => handleSubmit(e, selectedMeetup)}>
                <button className="close--btn" onClick={() => setIsOpen(false)}>
                  x
                </button>
                <label>Enter your name </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  name="name"
                  onChange={handleOnChange}
                />

                <label>Enter your email : </label>
                <input
                  type="text"
                  value={form.email}
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleOnChange}
                />

                {selectedMeetup.isPaid ? (
                  <p
                    style={{
                      color: "white",
                      fontSize: "12px",
                      marginTop: "2rem"
                    }}
                  >
                    * You have to make the payment at the venue
                  </p>
                ) : (
                  ""
                )}

                <button className="form--btn">RSVP</button>
              </form>
            )}

            {RSPVedEvents.map((e) => e.id === selectedMeetup.id).includes(
              true
            ) ? (
              <button disabled>Already RSVPed</button>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                style={{ cursor: "pointer" }}
              >
                RSVP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
