import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "./datatable.css";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const unsubscribeData = onSnapshot(
      collection(db, "users"),
      async (snapshot) => {
        const list = [];

        for (const doc of snapshot.docs) {
          const userData = { id: doc.id, ...doc.data() };

          const subSnapshot = await getDocs(
            collection(db, "users", doc.id, "submissions")
          );
          const submissions = subSnapshot.docs.map((subDoc) => ({
            id: subDoc.id,
            ...subDoc.data(),
          }));

          userData.submissions = submissions;
          list.push(userData);
        }

        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    const unsubscribeComments = onSnapshot(
      collection(db, "comments"),
      (snapshot) => {
        const commentsData = snapshot.docs.reduce((acc, doc) => {
          const commentData = doc.data();
          const submissionId = commentData.submissionId;

          if (!acc[submissionId]) {
            acc[submissionId] = [];
          }

          acc[submissionId].push({ id: doc.id, ...commentData });
          return acc;
        }, {});

        setComments(commentsData);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribeData();
      unsubscribeComments();
    };
  }, []);

  const handleSubmitComment = async (e, submissionId) => {
    e.preventDefault();

    if (newComment.trim() === "") {
      return;
    }

    try {
      const commentData = {
        text: newComment,
        submissionId: submissionId,
        timestamp: serverTimestamp(),
      };

      const newCommentRef = await addDoc(
        collection(db, "comments"),
        commentData
      );

      // Update the local state with the new comment
      setComments((prevComments) => {
        if (!prevComments[submissionId]) {
          return { ...prevComments, [submissionId]: [commentData] };
        } else {
          return {
            ...prevComments,
            [submissionId]: [
              ...prevComments[submissionId],
              { id: newCommentRef.id, ...commentData },
            ],
          };
        }
      });

      // Clear the new comment input
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="datatable scroll">
      {data.map((doc) => (
        <>
          {doc.submissions
            .filter((submission) => submission.img && submission.file)
            .map((submission) => (
              <div key={submission.id} className="grid-item">
                <Link to={`/preview/${doc.id}/${submission.id}`}>
                  <img className="" src={submission.img} alt="Image" />
                </Link>
                <h3>Name: {submission.name}</h3>
                <p>Description: {submission.description}</p>
                <p>Link: {submission.link}</p>
                <a
                  href={submission.file}
                  download={submission.file}
                  className="download-link"
                >
                  {submission.name}.obj
                </a>
                <hr />

                <div className="border ">
                  <h4>Comments</h4>
                  {comments[submission.id] &&
                    comments[submission.id].map((comment) => {
                      // Convert the object with seconds and nanoseconds to a Firestore Timestamp object
                      // const timestamp = Timestamp.fromDate(
                      //   new Date(comment.timestamp.seconds * 1000)
                      // );

                      // Create the formattedTimestamp variable for each comment

                      return (
                        <div key={comment.id} className="border ">
                          <p>{comment.text}</p>
                          {/* {comment.timestamp && (
                            <p>Time: {timestamp.toLocaleString()}</p>
                          )} */}
                        </div>
                      );
                    })}
                </div>
                <form onSubmit={(e) => handleSubmitComment(e, submission.id)}>
                  <input
                    type="text"
                    value={newComment[submission.id]}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                  />
                  <button type="submit">Post</button>
                </form>
              </div>
            ))}
        </>
      ))}
    </div>
  );
};

export default Datatable;
