import classes from "./contact-form.module.css";
import { useEffect, useState } from "react";
import Notification from "../ui/notification";

const sendContactData = async (contactDetails) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactDetails),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }
};

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");

  const [isLoading, setIsLoading] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (isLoading === "success" || isLoading === "error") {
      const timer = setTimeout(() => {
        setIsLoading(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const sendMessageHandler = async (event) => {
    event.preventDefault();

    setIsLoading("pending");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });

      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");

      setIsLoading("success");
    } catch (error) {
      setRequestError(error.message || "Something went wrong");
      setIsLoading("error");
    }
  };

  let notification;

  if (isLoading === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (isLoading === "success") {
    notification = {
      status: "success",
      title: "Success",
      message: "Message sent successfully",
    };
  }

  if (isLoading === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            value={enteredMessage}
            required
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
