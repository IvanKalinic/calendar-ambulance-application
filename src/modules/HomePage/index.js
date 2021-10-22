import React from "react";
import Calendar from "../../components/Calendar";
import SingleContent from "../../components/SingleContent";
import { firstPageContent } from "../../consts/index";
import "./index.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <h2>Pozdrav i dobrodošli u sustav Moj termin!</h2>
      <div className="flex-para-content">
        <p className="paragraph">
          Za naručivanje termina vrijede sljedeća pravila: <br /> Moguće je
          naručiti maksimalno jedan termin u danu. <br /> Moguće je naručiti
          maksimalno dva termina u toku tjedna. <br /> Pred vama se nalazi
          raspored sljedećih tjedan dana, počevši od sutrašnjeg dana.
        </p>
        <div className="additional-info">
          {firstPageContent.map((content, index) => (
            <SingleContent key={index} content={content} />
          ))}
        </div>
      </div>
      <h4>Vidimo se !</h4>
      <Calendar />
    </div>
  );
};

export default HomePage;
