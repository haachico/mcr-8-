import { useEffect, useState } from "react";
import { useContext } from "react";
import { MeetupsContext } from "..";

const Header = () => {
  const { meetupsData, displayedMeetups, setDisplayedMeetups } = useContext(
    MeetupsContext
  );
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const meetps = [...meetupsData].filter((e) =>
      e.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayedMeetups(meetps);
  }, [searchText]);

  console.log(displayedMeetups, "DISPLAYED");

  return (
    <div className="header">
      <h1>Meet ups</h1>
      <input
        type="text"
        value={searchText}
        onChange={handleSearch}
        placeholder="Search with title"
      />
    </div>
  );
};

export default Header;
