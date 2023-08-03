import React, { useEffect, useState, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";
import "./profile.css";

const Profile = () => {
  const [userDocuments, setUserDocuments] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserDocuments = async () => {
      if (currentUser) {
        const userUid = currentUser.uid;
        console.log(userUid);

        const q = query(
          collection(db, "users", userUid, "submissions"),
          where("img", "!=", null)
        );

        const querySnapshot = await getDocs(q);

        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserDocuments(documents);
      }
    };

    fetchUserDocuments();
  }, [currentUser]);

  return (
    <body>
      <div className="back awesome">
        <div className="head ">
          <link
            href="https://fonts.googleapis.com/css?family=Lato:300,400,700"
            rel="stylesheet"
            type="text/css"
          ></link>

          <div id="title">
            Logged-in User: {currentUser ? currentUser.email : ""}
          </div>
          <div className="">
            <h3 className="text-center">Documents Published:</h3>
            <ul className=" scrollable-content">
              {userDocuments
                .filter((document) => document.img && document.file)
                .map((document) => (
                  <div className="grid-item">
                    <li key={document.id}>
                      <img
                        className="border rounded w-[150px] p-[5px] border-solid border-[#ddd]"
                        src={document.img}
                        alt="Image"
                      />
                      <p>Document ID: {document.id}</p>
                      <p>Name: {document.name}</p>
                      <p>Description: {document.description}</p>
                      <p>Link: {document.link}</p>
                      <a
                        href={document.file}
                        download={document.file}
                        className="download-link"
                      >
                        {document.name}.obj
                      </a>

                      {/* Render other document fields here */}
                    </li>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Profile;
