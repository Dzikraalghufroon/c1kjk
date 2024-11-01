import React from "react";
import Styles from "./Profile.module.css";
import Buyahamka from './image-removebg.png';
import { useNavigate } from "react-router-dom";
import Mhatta from './mhatta.png'
import { useEffect, useState } from "react";
import Plus from "./plus-icon.png"
import axios from "axios";
import gaya from "./account.module.css"

const CircleButtons = () => {
  const [name, setname] = useState("");
  const [Buku, setBuku] = useState("");
  const navigate = useNavigate();
  const current = new Date();
  const day = current.getDay() - 1;
  const arrayDay = [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
  ];
  const date = current.getDate();
  const monthIndex = current.getMonth();
  const arrayMonth = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const Year = current.getFullYear();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/validation/checked`, {
          withCredentials: true
        });

        if (response.data.stat) {
          setname(response.data.name);
          // console.log(response.data)
        } else {
          //console.log(response.data.text);
        }
      } catch (error) {
        console.error("Error fetching siswa data:", error);
      }
    };
    fetchData();
  }, []);
  // useEffect(() => {
  //   const fetchBuku = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/dashboard/user/book`, { withCredentials: true })//('http://localhost:2000/read-kelas');
  //       setBuku(response.data);
  //     } catch (error) {
  //       console.error('Error Cok:', error);
  //     }
  //   };
  //   fetchBuku();
  // }, []);
  useEffect(() => {
    const fetchredata = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/dashboard/user/book`, { withCredentials: true });
        console.log(response.data.data)
        if (response.data) {
          setBuku(response.data.data);

        }
      } catch (error) {
        console.error('Error Cok:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchredata();
  }, []);


  return (
    <>
      {/* <div class={gaya.wrap}>
      <button class={gaya.button}>Logout</button>
    </div><br /><br /><br /> */}
      <img src={Buyahamka} alt="Buya Hamka" className={Styles.BuyaHamka} />
      <h6 className={Styles.Kata}>
        Kesuksesan bukan hanya tentang <br />
        berapa banyak harta yang kita kumpulkan, <br />
        tetapi tentang berapa <br />
        banyak kebaikan yang kita lakukan.
      </h6>
      <img src={Mhatta} alt="Muhammad Hatta" className={Styles.Mhatta} />
      <h6 className={Styles.Kata2}>
        Aku rela dipenjara asalkan bersama buku, <br />
        karena dengan buku aku bebas
      </h6>
      <div className={Styles.container}>
        <p className={Styles.halo}>Halo&nbsp;&nbsp;</p>
        <h2 className={Styles.userName}>{name}</h2>
      </div>
      <div className={Styles.Date}>
        <p className={Styles.DateP}>{arrayMonth[monthIndex]}&nbsp;{Year}</p>
        <br /><br />
        <div className={Styles.Kalender}>

          <li className={Styles.Hari}>
            <p className={Styles.tanggal}>{arrayDay[day - 2]}<br />{date - 2}</p>
          </li>
          <li className={Styles.Hari}>
            <p className={Styles.tanggal}>{arrayDay[day - 1]}<br />{date - 1}</p>
          </li>
          <li className={Styles.Hari}>
            <p className={Styles.tanggalAktif}>{arrayDay[day]} <br /> {date}</p>
          </li>
          <li className={Styles.Hari}>
            <p className={Styles.tanggal}>{arrayDay[day + 1]}<br /> {date + 1}</p>
          </li>
          <li className={Styles.Hari}>
            <p className={Styles.tanggal}>{arrayDay[day + 2]}<br />{date + 2}</p>
          </li>
        </div><br /><br /><br /><h3 className={Styles.h3}>Ubah data anda</h3><br />
        <button class={Styles.button_49} role="button" onClick={(() => navigate(`/profile/@/${name}`))}>Ubah data</button>

      </div>
      <div className={Styles.container2}>
      </div>
      <div className={Styles.koleksi}>
        <h2>Tambah Koleksi buku</h2>
      </div>
      <a onClick={(() => navigate("/profile/upload"))}>
        <div className={Styles.container3}>
          <img src={Plus} alt="" />
        </div>
      </a>
      <div className={Styles.List}>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : Buku && Buku.length > 0 ? (
            <ul className={Styles.questionList}>
              {Buku.map((item) => (


                <li key={item.id} className={Styles.questionItem}>
                  <img
                    src={`${import.meta.env.VITE_SERVER}/get-img/${item.route_image}`}
                    alt={item.route_image}
                    className={Styles.image}
                  />
                  <h4>{item.title}</h4>
                  <h4>{item.genre}</h4><br />
                  <li><div class={gaya.wrap}>
                    <button class={gaya.button} onClick={() => navigate(`/result/${item.id}`)}>open</button>
                  </div></li><br />
                  {/* <li><a className={Styles.a} onClick={() => navigate(`/result/${item.id}`)}>See answer</a></li> */}
                  {/* <li>
                      <div className={Styles.dropdownContainer}>
                        <button className={Styles.ellipsisButton} onClick={() => toggleDropdown(item.id)}>
                          &#x22EE;
                        </button>
                        {dropdownOpen === item.id && (
                          <div className={Styles.dropdownMenu}>
                            <button onClick={() => handleDelete(item.id)}>Hapus</button>
                          </div>
                        )}
                      </div>
                    </li> 
                    */}
                </li>


              ))}
            </ul>
          ) : (
            <p>No Buku available</p>
          )}
        </div >

      </div >
    </>
  );
};

export default CircleButtons;
