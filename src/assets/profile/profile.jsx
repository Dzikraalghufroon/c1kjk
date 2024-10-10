import React from "react";
import Styles from "./Profile.module.css";
import profile from '../sidebar/profile.png'

const CircleButtons = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.chart}>
        <img className={Styles.center} src={profile} />
        <button
          className={`${Styles.section} ${Styles.section1}`}
          onClick={() => alert("Clicked on Blue")}
        >
          Button 1
        </button>
        <button
          className={`${Styles.section} ${Styles.section2}`}
          onClick={() => alert("Clicked on Green")}
        >
          Button 2
        </button>
        <button
          className={`${Styles.section} ${Styles.section3}`}
          onClick={() => alert("Clicked on Cyan")}
        >
          Button 3
        </button>
        <button
          className={`${Styles.section} ${Styles.section4}`}
          onClick={() => alert("Clicked on Yellow")}
        >
          Button 4
        </button>
        <button
          className={`${Styles.section} ${Styles.section5}`}
          onClick={() => alert("Clicked on Orange")}
        >
          Button 5
        </button>
      </div>
    </div>
  );
};

export default CircleButtons;
