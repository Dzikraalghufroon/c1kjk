import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./account.module.css"
import CircleButtons from "../profile/profile";

const Account = () => {
    
    return (
        <>
            <div className={Styles.polaroid}>
                <div className={Styles.container}>
                    {/* <p className={Styles.text}>Hardanger, Norway</p>
                    <h1 className={Styles.text}>ajsnkjbjkbdjbkjbkdjbkbdakjbkdja</h1> */}
                    <div className={Styles.Profile}>
                        <h6 className={Styles.text}>
                            Nama : <br/>
                            Kelas : <br/>
                            Kelas : <br/>
                            Kelas : <br/>
                            Kelas : <br/>
                        </h6>
                        <div class={Styles.wrap}>
                            <button class={Styles.button}>Ubah Data</button>
                        </div><br /><br /><br />
                    </div>
                    <div className={Styles.Photo}>
                        <div className={Styles.wrap}>

                        </div>
                    </div>
                </div>
                {/* <button class={Styles.button_49} role="button"></buttons> */}
            </div>
        </>
    )
}
export default Account
