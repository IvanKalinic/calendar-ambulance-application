import React, { useState } from "react";
import { Minus, Plus } from "../../assets/icons";
import "./index.scss";

const SingleContent = ({ content }) => {
  const [showInfo, setShowInfo] = useState(false);
  const { key, info } = content;
  return (
    <article className="content">
      <header>
        <div className="sameline">
          <h4>{key}</h4>
          <button className="btn" onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? <Minus /> : <Plus />}
          </button>
        </div>
      </header>
      {showInfo && (
        <p className="info-paragraph">
          {typeof info === "string" ? (
            info
          ) : (
            <ul>
              {info.map(({ color, content }) => (
                <li className="flex-color-info">
                  <div
                    className="color-container"
                    style={{ backgroundColor: color }}
                  ></div>
                  <p>{content}</p>
                </li>
              ))}
            </ul>
          )}
        </p>
      )}
    </article>
  );
};

export default SingleContent;
