import React from 'react';

export default function About() {
  return (
    <>
      <div style={{ width: "100%",padding:"0px 20px 20px 20px" }}>
        <div style={{ width: "100%", height: "auto", background:"linear-gradient(#E2EAF4,white)", display: "flex",justifyContent:"center",alignItems:"center", flexWrap: "wrap" }}>
          <div style={{ background:"linear-gradient(#E2EAF4,white)",dispaly:"flex",justifyContent:"center",alignItems:'center' }}>
            <img src="/DALL·E 2024-10-12 14.16.33 - A sleek and modern digital interface showing a voting app on a smartphone screen. The app interface features a vibrant color scheme, with options for .webp" alt="err" style={{ width: "100%", height: "83.5vh", objectFit: "cover" }} />
          </div>
          <div style={{ flex: "1 1 50%", background:"linear-gradient(#E2EAF4,white)", padding: "10px" }}>
            <div style={{ flex: "1 1 50%", background:"linear-gradient(#E2EAF4,white)", padding: "10px" }}>
              <h2 style={{ marginTop: "20px", textAlign: "center" }}>Why Choose VoteSmart</h2>
              <p style={{ textAlign: "center", color: "black", fontFamily: "sans-serif", marginTop: "20px" }}>
              User-Friendly: With a simple and intuitive interface, anyone can create or participate in a vote, regardless of their technical skills.
              Secure & Anonymous: We prioritize your privacy. All votes are encrypted, ensuring confidentiality and transparency throughout the process.
              </p>
            </div>
            <div style={{ flex: "1 1 50%", background:"linear-gradient(#E2EAF4,white)", padding: "10px" }}>
              <h2 style={{ marginTop: "20px", textAlign: "center" }}>Our Vision</h2>
              <p style={{ textAlign: "center", color: "black", fontFamily: "sans-serif", marginTop: "20px" }}>
              At VoteSmart, we aim to revolutionize how people make decisions. We strive to build a world where everyone, regardless of location or background, can participate in shaping their community, workplace, or organization
              </p>
            </div>
            <div style={{ flex: "1 1 50%", background:"linear-gradient(#E2EAF4,white)", padding: "10px" }}>
              <h2 style={{ marginTop: "20px", textAlign: "center" }}>Join Us</h2>
              <p style={{ textAlign: "center", color: "black", fontFamily: "sans-serif", marginTop: "20px" }}>
              Ready to make decisions more efficiently and democratically? Join thousands of users who trust VoteSmart for their polls, surveys, and elections.
              </p>
            </div>
            <div style={{ flex: "1 1 50%", background:"linear-gradient(#E2EAF4,white)", padding: "10px" }}>
              <h2 style={{ marginTop: "20px", textAlign: "center" }}>Accessibility for All</h2>
              <p style={{ textAlign: "center", color: "black", fontFamily: "sans-serif", marginTop: "20px" }}>
              We are committed to ensuring that VoteSmart is accessible to everyone, regardless of their device or abilities. With features like multi-language support, screen reader compatibility, and easy navigation, our platform is designed to be inclusive and user-friendly for all, including those with visual or physical impairments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
