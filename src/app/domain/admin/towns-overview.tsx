import React, { useEffect, useState } from "react";
import "./towns-overview.scss";
import PageHeading from "../../shared/components/heading/page-heading";
// import SearchBar from "../../shared/components/search-bar/search-bar";
import placeholderProfileImage from "../../shared/assets/images/blank-profile.png";
import Alburquerque from "../../shared/assets/images/Alburquerque.jpg";
import Antequera from "../../shared/assets/images/Antequera.jpg";
import Baclayon from "../../shared/assets/images/Baclayon.jpg";
import Balilihan from "../../shared/assets/images/Balilihan.jpg";
import Calape from "../../shared/assets/images/Calape.jpg";
import Catigbian from "../../shared/assets/images/Catigbian.jpg";
import Corella from "../../shared/assets/images/Corella.jpg";
import Cortes from "../../shared/assets/images/Cortes.jpg";
import Dauis from "../../shared/assets/images/Dauis.jpg";
import Loon from "../../shared/assets/images/Loon.jpg";
import Maribojoc from "../../shared/assets/images/Maribojoc.jpg";
import Panglao from "../../shared/assets/images/Panglao.jpg";
import Sikatuna from "../../shared/assets/images/Sikatuna.jpg";
import TagbilaranCity from "../../shared/assets/images/Tagbilaran.jpg";
import Tubigon from "../../shared/assets/images/Tubigon.jpg";
import axios from "axios";
import TownUserCard from "../../shared/components/charts/town-card";

function TownsOverview() {
  // Correct usage of useState inside the functional component
  const [adminProfile, setAdminProfile] = useState({
    username: "Admin User",
    profileImage: placeholderProfileImage,
  });

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const username = localStorage.getItem("adminUsername");
        console.log(
          "Fetching admin profile for username from localStorage:",
          username
        );

        if (!username) {
          console.error(
            "No username found in localStorage. Redirecting to login..."
          );
          return;
        }

        const response = await axios.get(
          `https://uma-backend-production-d139.up.railway.app/admin-accounts/profile`,
          { params: { username } }
        );
        console.log("Profile data received from backend:", response.data);

        setAdminProfile({
          username: response.data.username || "Unknown User",
          profileImage: response.data.profileImage
            ? `https://uma-backend-production-d139.up.railway.app/${response.data.profileImage.replace(
                /\\/g,
                "/"
              )}` // Prepend server URL and replace backslashes
            : placeholderProfileImage,
        });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Axios error response:",
            err.response?.data || err.message
          );
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    fetchAdminProfile();
  }, []);

  // const handleSearch = (query: string) => {
  //   console.log("Search query:", query);
  // };

  // const handleSort = (sortValue: string) => {
  //   console.log("Sort by:", sortValue);
  // };

  // const handleFilter = (filterValue: string) => {
  //   console.log("Filter by:", filterValue);
  // };

  const townData = [
    {
      townName: "Alburquerque",
      barangays: [
        "Bahi",
        "Basacdacu",
        "Cantiguib",
        "Dangay",
        "East Poblacion",
        "Ponong",
        "San Agustin",
        "Santa Filomena",
        "Tagbuane",
        "Toril",
        "West Poblacion",
      ],
      imageSrc: Alburquerque,
      totalUsers: 550,
    },
    {
      townName: "Antequera",
      barangays: [
        "Angilan",
        "Bantolinao",
        "Bicahan",
        "Bitaugan",
        "Bungahan",
        "Canlaas",
        "Cansibuan",
        "Can-omay",
        "Celing",
        "Danao",
        "Danicop",
        "Mag-aso",
        "Poblacion",
        "Quinapon-an",
        "Santo Rosario",
        "Tabuan",
        "Tagubaas",
        "Tupas",
        "Ubojan",
        "Viga",
        "Villa Aurora (Canon-oc)",
      ],
      imageSrc: Antequera,
      totalUsers: 320,
    },
    {
      townName: "Baclayon",
      barangays: [
        "Cambanac",
        "Dasitam",
        "Buenaventura",
        "Guiwanon",
        "Landican",
        "Laya",
        "Libertad",
        "Montana",
        "Pamilacan",
        "Payahan",
        "Poblacion",
        "San Isidro",
        "San Roque",
        "San Vicente",
        "Santa Cruz",
        "Taguihon",
        "Tanday",
      ],
      imageSrc: Baclayon,
      totalUsers: 210,
    },
    {
      townName: "Balilihan",
      barangays: [
        "Baucan Norte",
        "Baucan Sur",
        "Boctol",
        "Boyog Norte",
        "Boyog Proper",
        "Boyog Sur",
        "Cabad",
        "Candasig",
        "Cantalid",
        "Cantomimbo",
        "Cogon",
        "Datag Norte",
        "Datag Sur",
        "Del Carmen Este (Pob.)",
        "Del Carmen Norte (Pob.)",
        "Del Carmen Weste (Pob.)",
        "Del Carmen Sur (Pob.)",
        "Del Rosario",
        "Dorol",
        "Haguilanan Grande",
        "Hanopol Este",
        "Hanopol Norte",
        "Hanopol Weste",
        "Magsija",
        "Maslog",
        "Sagasa",
        "Sal-ing",
        "San Isidro",
        "San Roque",
        "Santo Niño",
        "Tagustusan",
      ],
      imageSrc: Balilihan,
      totalUsers: 130,
    },
    {
      townName: "Calape",
      barangays: [
        "Abucayan Norte",
        "Abucayan Sur",
        "Banlasan",
        "Bentig",
        "Binogawan",
        "Bonbon",
        "Cabayugan",
        "Cabudburan",
        "Calunasan",
        "Camias",
        "Canguha",
        "Catmonan",
        "Desamparados (Pob.)",
        "Kahayag",
        "Kinabag-an",
        "Labuon",
        "Lawis",
        "Liboron",
        "Lo-oc",
        "Lomboy",
        "Lucob",
        "Madangog",
        "Magtongtong",
        "Mandaug",
        "Mantatao",
        "Sampoangon",
        "San Isidro",
        "Santa Cruz (Pob.)",
        "Sojoton",
        "Talisay",
        "Tinibgan",
        "Tultugan",
        "Ulbujan",
      ],
      imageSrc: Calape,
      totalUsers: 250,
    },
    {
      townName: "Catigbian",
      barangays: [
        "Alegria",
        "Ambuan",
        "Baang",
        "Bagtic",
        "Bongbong",
        "Cambailan",
        "Candumayao",
        "Kang-iras",
        "Causwagan Norte",
        "Hagbuaya",
        "Haguilanan",
        "Libertad Sur",
        "Liboron",
        "Mahayag Norte",
        "Mahayag Sur",
        "Maitum",
        "Mantasida",
        "Poblacion",
        "Rizal",
        "Sinakayanan",
        "Triple Union",
        "Poblacion Weste",
      ],
      imageSrc: Catigbian,
      totalUsers: 30,
    },
    {
      townName: "Corella",
      barangays: [
        "Anislag",
        "Canangca-an",
        "Canapnapan",
        "Cancatac",
        "Pandol",
        "Poblacion",
        "Sambog",
        "Tanday",
      ],
      imageSrc: Corella,
      totalUsers: 75,
    },
    {
      townName: "Cortes",
      barangays: [
        "De la Paz",
        "Fatima",
        "Loreto",
        "Lourdes",
        "Malayo Norte",
        "Malayo Sur",
        "Monserrat",
        "New Lourdes",
        "Patrocinio",
        "Poblacion",
        "Rosario",
        "Salvador",
        "San Roque",
        "Upper de la Paz",
      ],
      imageSrc: Cortes,
      totalUsers: 550,
    },
    {
      townName: "Dauis",
      barangays: [
        "Biking",
        "Bingag",
        "San Isidro (Canlongon)",
        "Catarman",
        "Dao",
        "Mayacabac",
        "Poblacion",
        "Songculan",
        "Tabalong",
        "Tinago",
        "Totolan",
        "Mariveles",
      ],
      imageSrc: Dauis,
      totalUsers: 550,
    },
    {
      townName: "Loon",
      barangays: [
        "Agsoso",
        "Badbad Occidental",
        "Badbad Oriental",
        "Bagacay Katipunan",
        "Bagacay Kawayan",
        "Bagacay Saong",
        "Bahi",
        "Basac",
        "Basdacu",
        "Basdio",
        "Biasong",
        "Bongco",
        "Bugho",
        "Cabacongan",
        "Cabadug",
        "Cabug",
        "Calayugan Norte",
        "Calayugan Sur",
        "Canmaag",
        "Cambaquiz",
        "Campatud",
        "Candaigan",
        "Canhangdon Occidental",
        "Canhangdon Oriental",
        "Canigaan",
        "Canmanoc",
        "Cansuagwit",
        "Cansubayon",
        "Catagbacan Handig",
        "Catagbacan Norte",
        "Catagbacan Sur",
        "Cantam-is Bago",
        "Cantaongon",
        "Cantumocad",
        "Cantam-is Baslay",
        "Cogon Norte (Pob.)",
        "Cogon Sur",
        "Cuasi",
        "Genomoan",
        "Lintuan",
        "Looc",
        "Mocpoc Norte",
        "Mocpoc Sur",
        "Nagtuang",
        "Napo (Pob.)",
        "Nueva Vida",
        "Panangquilon",
        "Pantudlan",
        "Pig-ot",
        "Moto Norte (Pob.)",
        "Moto Sur (Pob.)",
        "Pondol",
        "Quinobcoban",
        "Sondol",
        "Song-on",
        "Talisay",
        "Tan-awan",
        "Tangnan",
        "Taytay",
        "Ticugan",
        "Tiwi",
        "Tontonan",
        "Tubodacu",
        "Tubodio",
        "Tubuan",
        "Ubayon",
        "Ubojan",
      ],
      imageSrc: Loon,
      totalUsers: 550,
    },
    {
      townName: "Maribojoc",
      barangays: [
        "San Roque (Aghao)",
        "Agahay",
        "Aliguay",
        "Anislag",
        "Bayacabac",
        "Bood",
        "Busao",
        "Cabawan",
        "Candavid",
        "Dipatlong",
        "Guiwanon",
        "Jandig",
        "Lagtangon",
        "Lincod",
        "Pagnitoan",
        "Poblacion",
        "Punsod",
        "Punta Cruz",
        "San Isidro",
        "San Vicente",
        "Tinibgan",
        "Toril",
      ],
      imageSrc: Maribojoc,
      totalUsers: 550,
    },
    {
      townName: "Panglao",
      barangays: [
        "Bil-isan",
        "Bolod",
        "Danao",
        "Doljo",
        "Libaong",
        "Looc",
        "Lourdes",
        "Poblacion",
        "Tangnan",
        "Tawala",
      ],
      imageSrc: Panglao,
      totalUsers: 550,
    },
    {
      townName: "Sikatuna",
      barangays: [
        "Abucay Norte",
        "Abucay Sur",
        "Badiang",
        "Bahaybahay",
        "Cambuac Norte",
        "Cambuac Sur",
        "Canagong",
        "Libjo",
        "Poblacion I",
        "Poblacion II",
      ],
      imageSrc: Sikatuna,
      totalUsers: 550,
    },
    {
      townName: "Tagbilaran City",
      barangays: [
        "Bool",
        "Booy",
        "Cabawan",
        "Cogon",
        "Dao",
        "Dampas",
        "Manga",
        "Mansasa",
        "Poblacion I",
        "Poblacion II",
        "Poblacion III",
        "San Isidro",
        "Taloto",
        "Tiptip",
        "Ubujan",
      ],
      imageSrc: TagbilaranCity,
      totalUsers: 550,
    },
    {
      townName: "Tubigon",
      barangays: [
        "Ilijan Norte",
        "Bagongbanwa Island",
        "Banlasan",
        "Batasan Island",
        "Bilangbilangan Island",
        "Bosongon",
        "Buenos Aires",
        "Bunacan",
        "Cabulijan",
        "Cahayag",
        "Cawayanan",
        "Centro",
        "Genonocan",
        "Guiwanon",
        "Ilijan Sur",
        "Libertad",
        "Macaas",
        "Matabao",
        "Mocaboc Island",
        "Panadtaran",
        "Panaytayon",
        "Pandan",
        "Pangapasan Island",
        "Pinayagan Norte",
        "Pinayagan Sur",
        "Pooc Occidental",
        "Pooc Oriental",
        "Potohan",
        "Talenceras",
        "Tan-awan",
        "Tinangnan",
        "Ubojan",
        "Ubay Island",
        "Villanueva",
      ],
      imageSrc: Tubigon,
      totalUsers: 550,
    },
  ];

  return (
    <div className="message-display">
      <PageHeading
        title="Towns Overview"
        subtitle="View Town Users Overview"
        profileImage={adminProfile.profileImage}
        username={adminProfile.username}
      />
      <div className="message-content">
        {/* <div className="search-message">
          <SearchBar
            onSearch={handleSearch}
            onSort={handleSort}
            onFilter={handleFilter}
            sortOptions={[
              { value: "name", label: "Name" },
              { value: "date", label: "Date" },
            ]}
            filterOptions={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
            ]}
          />
        </div> */}
        <div className="towns-container">
          {townData.map((town, index) => (
            <TownUserCard
              key={index}
              townName={town.townName}
              barangays={town.barangays}
              imageSrc={town.imageSrc}
              totalUsers={town.totalUsers}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TownsOverview;
