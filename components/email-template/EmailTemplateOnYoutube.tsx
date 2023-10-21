import { File, Profile } from "@prisma/client";
import * as React from "react";

interface EmailTemplateProps {
  profile: Profile;
  file: File;
}

const EmailTemplateOnYoutube: React.FC<Readonly<EmailTemplateProps>> = ({
  profile,
  file,
}) => (
  <div
    style={{
      background: "white",
      color: "black",
      padding: "16px",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
      style={{ textAlign: "center", margin: "0 0 10px 0", cursor: "pointer" }}
    >
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          margin: "0",
          padding: "0",
        }}
      >
        <a
          href="http://localhost:3000/"
          style={{ color: "#670499", textDecoration: "none" }}
        >
          Ultrastore
        </a>
      </h1>
    </div>
    <div style={{ textAlign: "center", fontSize: "18px", margin: "10px 0" }}>
      The most private free storage on the planet 🤫
    </div>
    <div style={{ textAlign: "center", margin: "40px 0" }}>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Hey, {profile.name}
      </p>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Your file is On Youtube?!?! <br />
        Check it out!!
      </p>
      <p style={{ fontSize: "14px", color: "#464646" }}>
        Visit your file:{" "}
        <a
          href={"http://localhost:3000/your-files/" + file.id}
          style={{ color: "#670499", textDecoration: "none" }}
        >
          Click here
        </a>
      </p>
    </div>
  </div>
);

export default EmailTemplateOnYoutube;
