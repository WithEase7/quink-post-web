import React from "react";
import "../Styles/Aboutpage.css";
import mainmob from "../Assets/home-img.png";
import secondmob from "../Assets/f-icon1.png";
import third from "../Assets/f-icon2.png";
import fourth from "../Assets/f-icon2.png";
import fifth from "../Assets/about-img.png";
import sixth from "../Assets/pic1.png";
import seventh from "../Assets/pic2.png";
import eighth from "../Assets/pic3.png";
import ninth from "../Assets/contact-img.png";

function AboutPage() {
  return (
    <div className="aboutonlycss">
      <header>
        <a href="/" className="logo">
          <span>QUINK</span>
          {" POST"}
        </a>

        <input type="checkbox" id="menu-bar" />
      </header>

      <section className="home" id="home">
        <div className="content">
          <h3>
            India's first content creation <span>platform</span>
          </h3>
          <p>
            An infotainment platform with content creation, community connect,
            mentorship and content creation challenges also providing its
            original content such as transcribed interviews, survey reports,
            research summaries, written podcasts, magazines, articles.
          </p>
          <a href="https://play.google.com/store/apps/details?id=com.quinkpost.quinkpost" className="btn">
            Download Now
          </a>
        </div>

        <div className="imageabout">
          <img src={mainmob} alt="" />
        </div>
      </section>

      <section className="features" id="features">
        <h1 className="heading"> Features </h1>

        <div className="box-container">
          <div className="box">
            <img src={secondmob} alt="" />
            <h3>Content Creation in Native Language </h3>
            <p>
              We have seen a lot of platforms where we can create content in
              English. But for the very fist time, We are introducing content
              creation in your native language.
            </p>
            <a href="#" className="btn">
              read more
            </a>
          </div>

          <div className="box">
            <img src={third} alt="" />
            <h3>Simple Revenue Insights</h3>
            <p>
              You can simply checkout how much reach you've got through your
              latest uploaded content and how much revenue it has earned through
              advertisement.
            </p>
            <a href="#" className="btn">
              read more
            </a>
          </div>

          <div className="box">
            <img src={fourth} alt="" />
            <h3>freindly interactions among community and chats</h3>
            <p>
              You can share any content to your friend and recommend them to
              read or view it. You can join specific communities as well where
              people of similar thoughts can interact with each other and can
              get there queries solved regarding similar topics.
            </p>
            <a href="#" className="btn">
              read more
            </a>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <h1 className="heading"> about the app </h1>

        <div className="column">
          <div className="imageabout">
            <img src={fifth} alt="" />
          </div>

          <div className="content">
            <h3>Infotainment platform with Content Creation</h3>
            <p>
              An infotainment platform with content creation, community
              connect/work with similar minds, mentorship and content creation
              challenges also providing its original content such as transcribed
              interviews, survey reports, research summaries, written podcasts,
              magazines, articles.
            </p>
            <p>
              It lets you create content in any language and shares its ad
              revenue with the creators.
            </p>
            <div className="buttons">
              {/* <a href="#" className="btn">
                
                app store
              </a> */}
              <a href="https://play.google.com/store/apps/details?id=com.quinkpost.quinkpost" className="btn">
                 play store
               </a>
            </div>
          </div>
        </div>
      </section>

      <div className="newsletter">
        <h3>Subscribe For New Features</h3>
        <p style={{ paddingBottom: 25 }}>
          We always try to provide more & more features to our users. Get
          notified on every update. Follow our social media handles as well.
        </p>
        <form action="">
          <input
            style={{ borderColor: "transparent" }}
            type="email"
            placeholder="enter your email"
          />
          <input type="submit" value="Subscribe" />
        </form>
      </div>

      <section className="review" id="review">
        <h1 className="heading"> User's review </h1>

        <div className="box-container">
          <div className="box">
            ={" "}
            <div className="user">
              <img src={sixth} alt="" />
              <h3>Gunter Kristin</h3>
              <div className="comment">
                My journey with Quink Post has been overwhelming. I've been
                creating content on Quink Post since its launch. I was featured
                in its Q-Magazine as well.
              </div>
            </div>
          </div>

          <div className="box">
            <div className="user">
              <img src={seventh} alt="" />
              <h3>John Amore</h3>
              <div className="comment">
                Quink Post has given me recognition. I'm earning enough through
                Quink Post. It's one of the most genuine platform which shares
                its ad based revenue equally.
              </div>
            </div>
          </div>

          <div className="box">
            <div className="user">
              <img src={eighth} alt="" />
              <h3>Mavin Shrim</h3>
              <div className="comment">
                Quink Post is one of the best content creation platform. I've
                been using this platform since the start and I'm getting results
                as well. It had helped me in getting global reach.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="imageabout">
          <img src={ninth} alt="" />
        </div>

        <form action="">
          <h1 className="heading">Contact Us</h1>

          <div className="inputBox">
            <input type="text" required />
            <label style={{ paddingLeft: 10 }}>name</label>
          </div>

          <div className="inputBox">
            <input type="email" required />
            <label style={{ paddingLeft: 10 }}>email</label>
          </div>

          <div className="inputBox">
            <input type="number" required />
            <label style={{ paddingLeft: 10 }}>phone</label>
          </div>

          <div className="inputBox">
            <textarea required name="" id="" cols="30" rows="10"></textarea>
            <label style={{ paddingLeft: 10 }}>message</label>
          </div>

          <input type="submit" className="btn" value="Send Message" />
        </form>
      </section>

      <div className="footer">
        <div className="box-container">
          <div className="box">
            <h3>about us</h3>
            <p>
              {
                "Quink Post is an infotainment platform with content creation in any language. Our motive is to share ad based revenue with the creators. "
              }
            </p>
          </div>

          <div className="box">
            <h3>quick links</h3>
            <p>+91-8989802456</p>
            <p>info@quinkpost.com</p>
            <p>
              {" "}
              Bhopal Smart City Development Corporation Ltd, Govindpura, Bhopal{" "}
            </p>
          </div>

          <div className="box">
            <h3>follow us</h3>
            <a href="https://www.facebook.com/quinkpost.post/">facebook</a>
            <a href="https://www.instagram.com/quink_post/">instagram</a>
            <a href="https://www.linkedin.com/company/quinkpost">LinkedIn</a>
            <a href="https://www.f6s.com/quink-post">F6S</a>
          </div>
        </div>

        <h1 className="credit"> &copy; copyright @ Quink Post by QP Devs </h1>
      </div>
    </div>
  );
}

export default AboutPage;
