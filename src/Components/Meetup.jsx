const Meetup = ({ title, image, startTime, eventType }) => {
  const dateTime = new Date(startTime);

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

  return (
    <div className="meetup">
      <div>
        <img src={image} alt={title} />
        <h5>{eventType}</h5>
      </div>
      <p>
        {dayOfWeek} {date} {time}
      </p>
      <h3>{title}</h3>
    </div>
  );
};

export default Meetup;
