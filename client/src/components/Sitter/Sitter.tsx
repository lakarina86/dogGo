import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper";
import avatarPic from "../../static/images/avatar.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Sitter.css";
import { ISitter } from "../../interfaces/ISitter";
const APIbase = "http://localhost:3001";

const Sitter: React.FC = () => {
  const [sitters, setSitters] = useState<ISitter[]>([]);
  const [popupActive, setPopupActive] = useState(false);
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getSitters = () => {
    fetch(APIbase + "/sitters")
      .then((res) => res.json())
      .then(({ data }) => {
        setSitters(data);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getSitters();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSitter = {
      _id: null,
      name,
      quote,
      avatar,
    };
    fetch(APIbase + "/sitters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSitter),
    }).then(() => {
      setSitters([...sitters, newSitter]);
      setName("");
      setQuote("");
      setAvatar("");
      setPopupActive(false);
      getSitters();
    });
  };

  return (
    <section id="dogSitter">
      <div className="Sitter-titles">
        <h2> Book a sitter for your pet </h2>
        <h3> Specialists in animal care, will take care of your pet in your home or theirs </h3>
      </div>
      <Swiper
        className="container sitter_container"
        modules={[Pagination, Navigation, A11y]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={true}
      >
        {sitters.length > 0 && !isLoading ? (
          sitters.map((sitter) => (
            <SwiperSlide key={sitter._id} className="sitter">
              <div className="sitter_avatar">
                <img src={avatarPic} alt="avatar" className="avatarPic" />
              </div>
              <h5 className="sitterName"> {sitter.name.toUpperCase()} </h5>
              <small className="sitter_quote"> " {sitter.quote} "</small>
              <div className="sitter_buttons">
                <button className="btn btn-primary "> message Sitter </button>
                <button className="btn learn"> Learn More </button>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="sitter">
            <div className="sitter_avatar"></div>
            <h5 className="sitterName"> we are sorry </h5>
            <small className="sitter_quote">
              {" "}
              No sitters are availabe in your area{" "}
            </small>
          </SwiperSlide>
        )}
      </Swiper>
      <div className="become-sitter">
        <button
          className="btn btn-primary join"
          onClick={() => setPopupActive(true)}
        >
          Join our team!
        </button>
      </div>
      {popupActive ? (
        <div className="popupForm">
          <div className="formDiv">
            <h2 className="formTitle"> Become a sitter</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <label>Name</label>
              <br />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="add name here.."
                className="textArea"
              />
              <br />
              <label> About you </label>
              <br />
              <input
                required
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="textArea about"
                placeholder="tell us a bit about yourself and animal experience here.."
              />
              <br />
              <label>Avatar</label>
              <br />
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="textArea"
                placeholder="eventually you will upload a photo here.."
              />
              <br />
              <div className="form_buttons">
                <button className="btn submitBtn"> Join! </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setPopupActive(false)}
                >
                  close
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export { Sitter }
